import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineScrubbleNumber, InlineTooltip } from "@/components/atoms";
import { ImageDisplay } from "@/components/atoms";
import { getVariableInfo, numberPropsFromDefinition } from "../variables";
import { useVar } from "@/stores";

// Reactive component to show time visualization with an animated clock
function TimeVisualization() {
    const time = useVar('timeTaken', 10) as number;

    // Calculate clock hand position (seconds)
    const secondsAngle = (time / 60) * 360;

    return (
        <div className="relative bg-white rounded-lg p-4 border border-slate-200">
            {/* Clock face */}
            <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Clock circle */}
                    <circle cx="50" cy="50" r="45" fill="white" stroke="#8E90F5" strokeWidth="3" />

                    {/* Clock center */}
                    <circle cx="50" cy="50" r="3" fill="#8E90F5" />

                    {/* Hour markers */}
                    {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 - 90) * (Math.PI / 180);
                        const x1 = 50 + 38 * Math.cos(angle);
                        const y1 = 50 + 38 * Math.sin(angle);
                        const x2 = 50 + 42 * Math.cos(angle);
                        const y2 = 50 + 42 * Math.sin(angle);
                        return (
                            <line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#64748b"
                                strokeWidth="2"
                            />
                        );
                    })}

                    {/* Numbers */}
                    {[12, 3, 6, 9].map((num) => {
                        const angle = ((num === 12 ? 0 : num === 3 ? 90 : num === 6 ? 180 : 270) - 90) * (Math.PI / 180);
                        const x = 50 + 32 * Math.cos(angle);
                        const y = 50 + 32 * Math.sin(angle) + 4;
                        return (
                            <text
                                key={num}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                fontSize="8"
                                fill="#64748b"
                                fontWeight="bold"
                            >
                                {num}
                            </text>
                        );
                    })}

                    {/* Second hand */}
                    <line
                        x1="50"
                        y1="50"
                        x2={50 + 35 * Math.cos((secondsAngle - 90) * (Math.PI / 180))}
                        y2={50 + 35 * Math.sin((secondsAngle - 90) * (Math.PI / 180))}
                        stroke="#8E90F5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="transition-all duration-300"
                    />
                </svg>
            </div>

            {/* Time display */}
            <div className="mt-4 text-center">
                <span className="text-2xl font-bold text-indigo-500">{time} seconds</span>
                <p className="text-sm text-slate-500 mt-1">Time taken</p>
            </div>

            {/* Time comparison */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className={`p-2 rounded ${time <= 10 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    🏃 Very quick!
                </div>
                <div className={`p-2 rounded ${time > 10 && time <= 30 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    🚶 Normal pace
                </div>
                <div className={`p-2 rounded ${time > 30 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                    🐢 Taking time
                </div>
            </div>
        </div>
    );
}

export const timeSectionBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-time-title" maxWidth="xl">
        <Block id="time-title" padding="md">
            <EditableH2 id="h2-time-title" blockId="time-title">
                Time — How Long?
            </EditableH2>
        </Block>
    </StackLayout>,

    // Time introduction
    <StackLayout key="layout-time-intro" maxWidth="xl">
        <Block id="time-intro" padding="sm">
            <EditableParagraph id="para-time-intro" blockId="time-intro">
                Now let's learn about{" "}
                <InlineTooltip id="tooltip-time-def" tooltip="Time measures how long something takes to happen.">
                    time
                </InlineTooltip>
                . Time tells us how long something takes. We measure short times in{" "}
                <InlineTooltip id="tooltip-seconds" tooltip="A second is a very short time — about as long as it takes to say 'one thousand'.">
                    seconds
                </InlineTooltip>{" "}
                (s), and longer times in{" "}
                <InlineTooltip id="tooltip-minutes" tooltip="A minute is 60 seconds. It's about how long it takes to brush your teeth properly!">
                    minutes
                </InlineTooltip>{" "}
                or{" "}
                <InlineTooltip id="tooltip-hours" tooltip="An hour is 60 minutes or 3600 seconds. A school lesson is usually about 1 hour.">
                    hours
                </InlineTooltip>
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive time example
    <SplitLayout key="layout-time-interactive" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="time-interactive-text" padding="sm">
                <EditableParagraph id="para-time-interactive-text" blockId="time-interactive-text">
                    Let's explore time! Imagine you're timing how long it takes to run across the playground. The time taken is{" "}
                    <InlineScrubbleNumber
                        varName="timeTaken"
                        {...numberPropsFromDefinition(getVariableInfo('timeTaken'))}
                    />{" "}
                    seconds. Try changing this number and watch the clock hand move!
                </EditableParagraph>
            </Block>
            <Block id="time-explanation" padding="sm">
                <EditableParagraph id="para-time-explanation" blockId="time-explanation">
                    Notice how different amounts of time feel: 10 seconds is very quick — about as long as counting to ten slowly. 30 seconds is half a minute. 60 seconds is a whole minute!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="time-visualization" padding="sm" hasVisualization>
            <TimeVisualization />
        </Block>
    </SplitLayout>,

    // Stopwatch image
    <StackLayout key="layout-time-stopwatch-image" maxWidth="xl">
        <Block id="time-stopwatch-image" padding="sm">
            <ImageDisplay
                src="https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800"
                alt="A stopwatch for timing"
                caption="We use stopwatches to measure time in seconds — perfect for races and sports!"
                bordered
            />
        </Block>
    </StackLayout>,

    // Time conversion facts
    <StackLayout key="layout-time-conversions" maxWidth="xl">
        <Block id="time-conversions" padding="sm">
            <EditableParagraph id="para-time-conversions" blockId="time-conversions">
                Here's how time units connect: 60 seconds = 1 minute. 60 minutes = 1 hour. 24 hours = 1 day. When we calculate speed, we often use seconds for short activities and hours for longer journeys like car trips.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
