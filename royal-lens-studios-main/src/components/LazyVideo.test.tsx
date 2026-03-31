import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LazyVideo from "@/components/LazyVideo";

describe("LazyVideo", () => {
  it("loads immediately for priority hero media", () => {
    const { container } = render(<LazyVideo src="video.mp4" priority muted autoPlay />);
    const video = container.querySelector("video");

    expect(video).toHaveAttribute("src", "video.mp4");
    expect(video).toHaveAttribute("preload", "auto");
  });

  it("keeps non-priority media deferred until in view", () => {
    const { container } = render(<LazyVideo src="video.mp4" muted />);
    const video = container.querySelector("video");

    expect(video).not.toHaveAttribute("src");
    expect(video).toHaveAttribute("preload", "none");
  });
});
