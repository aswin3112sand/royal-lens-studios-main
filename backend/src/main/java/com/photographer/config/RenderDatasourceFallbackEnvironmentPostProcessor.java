package com.photographer.config;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

public class RenderDatasourceFallbackEnvironmentPostProcessor
    implements EnvironmentPostProcessor, Ordered {

  private static final Logger log =
      LoggerFactory.getLogger(RenderDatasourceFallbackEnvironmentPostProcessor.class);

  private static final String SOURCE_NAME = "renderDatasourceFallback";

  @Override
  public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
    boolean forceFallback =
        Boolean.parseBoolean(environment.getProperty("APP_FORCE_H2_FALLBACK", "false"));
    boolean autoFallback =
        Boolean.parseBoolean(environment.getProperty("APP_AUTO_H2_FALLBACK", "true"));

    String datasourceUrl = environment.getProperty("spring.datasource.url", "").trim();

    if (!forceFallback && !(autoFallback && needsFallback(datasourceUrl))) {
      return;
    }

    Map<String, Object> overrides = new HashMap<>();
    overrides.put("spring.datasource.url", "jdbc:h2:mem:photographer;MODE=MySQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE");
    overrides.put("spring.datasource.username", "sa");
    overrides.put("spring.datasource.password", "");
    overrides.put("spring.datasource.driver-class-name", "org.h2.Driver");
    overrides.put("spring.flyway.enabled", "false");
    overrides.put("spring.jpa.hibernate.ddl-auto", "update");
    overrides.put("spring.jpa.properties.hibernate.dialect", "org.hibernate.dialect.H2Dialect");

    environment.getPropertySources().addFirst(new MapPropertySource(SOURCE_NAME, overrides));

    if (forceFallback) {
      log.warn(
          "[DEPLOY_CONFIG] APP_FORCE_H2_FALLBACK=true. "
              + "Forcing in-memory H2 datasource regardless of configured DB URL.");
    } else {
      log.warn(
          "[DEPLOY_CONFIG] Datasource URL '{}' is not reachable-safe for Render. "
              + "Falling back to in-memory H2. Set APP_AUTO_H2_FALLBACK=false to disable.",
          datasourceUrl);
    }
  }

  @Override
  public int getOrder() {
    return Ordered.HIGHEST_PRECEDENCE;
  }

  private boolean needsFallback(String datasourceUrl) {
    if (datasourceUrl.isBlank()) {
      return true;
    }

    String normalized = datasourceUrl.toLowerCase();

    return normalized.contains("localhost")
        || normalized.contains("127.0.0.1")
        || normalized.contains("0.0.0.0");
  }
}
