import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, } from "react";

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    gap?: number;
    pauseOnHover?: boolean;
}

export default function Marquee({ children, speed = 0.6, gap = 0, pauseOnHover = true }: MarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    const paused = useRef(false);

    const [repeat, setRepeat] = useState(2);

    // Tính số lần clone
    useLayoutEffect(() => {
        const calculate = () => {
            if (!containerRef.current || !groupRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const groupWidth = groupRef.current.offsetWidth;

            if (!groupWidth) return;

            // luôn lớn hơn viewport khoảng 3 lần
            const times = Math.ceil((containerWidth * 3) / groupWidth);

            setRepeat(Math.max(times, 2));
        };

        calculate();

        window.addEventListener("resize", calculate);

        return () => window.removeEventListener("resize", calculate);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        const group = groupRef.current;

        if (!track || !group) return;

        let raf = 0;
        let offset = 0;

        const animate = () => {
            if (!paused.current) {
                offset += speed;

                if (offset >= group.offsetWidth + gap) {
                    offset = 0;
                }

                track.style.transform = `translate3d(${-offset}px,0,0)`;
            }

            raf = requestAnimationFrame(animate);
        };

        raf = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(raf);
    }, [speed, gap]);

    return (
        <div
            ref={containerRef}
            className="overflow-hidden"
            onMouseEnter={() => {
                if (pauseOnHover) paused.current = true;
            }}
            onMouseLeave={() => {
                paused.current = false;
            }}
        >
            <div
                ref={trackRef}
                className="flex will-change-transform"
                style={{
                    gap,
                    width: "max-content",
                }}
            >
                <div
                    ref={groupRef}
                    className="flex shrink-0"
                    style={{ gap }}
                >
                    {children}
                </div>

                {Array.from({ length: repeat }).map((_, i) => (
                    <div
                        key={i}
                        className="flex shrink-0"
                        style={{ gap }}
                        aria-hidden
                    >
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
}