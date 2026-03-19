import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineScrubbleNumber, InlineTooltip } from "@/components/atoms";
import { ImageDisplay } from "@/components/atoms";
import { getVariableInfo, numberPropsFromDefinition } from "../variables";
import { useVar } from "@/stores";

// Reactive component to show distance visualization
function DistanceVisualization() {
    const distance = useVar('distanceWalked', 100) as number;
    const maxDistance = 500;
    const progressPercent = (distance / maxDistance) * 100;

    return (
        <div className="relative bg-white rounded-lg p-4 border border-slate-200">
            {/* Track */}
            <div className="relative h-24 bg-gradient-to-r from-green-100 to-green-50 rounded-lg overflow-hidden">
                {/* Start flag */}
                <div className="absolute left-2 top-2 text-2xl">🏁</div>

                {/* Distance markers */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-slate-500">
                    <span>0m</span>
                    <span>100m</span>
                    <span>200m</span>
                    <span>300m</span>
                    <span>400m</span>
                    <span>500m</span>
                </div>

                {/* Walking person */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 text-3xl"
                    style={{ left: `${Math.min(progressPercent, 95)}%` }}
                >
                    🚶
                </div>

                {/* Distance line */}
                <div
                    className="absolute top-1/2 left-4 h-1 bg-teal-400 rounded transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Distance display */}
            <div className="mt-4 text-center">
                <span className="text-2xl font-bold text-teal-600">{distance} metres</span>
                <p className="text-sm text-slate-500 mt-1">Distance walked</p>
            </div>
        </div>
    );
}

export const distanceSectionBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-distance-title" maxWidth="xl">
        <Block id="distance-title" padding="md">
            <EditableH2 id="h2-distance-title" blockId="distance-title">
                Distance — How Far?
            </EditableH2>
        </Block>
    </StackLayout>,

    // Distance introduction
    <StackLayout key="layout-distance-intro" maxWidth="xl">
        <Block id="distance-intro" padding="sm">
            <EditableParagraph id="para-distance-intro" blockId="distance-intro">
                Before we can understand speed, we need to know about{" "}
                <InlineTooltip id="tooltip-distance-def" tooltip="Distance measures how far something travels from start to finish.">
                    distance
                </InlineTooltip>
                . Distance tells us how far something has moved. We measure distance in{" "}
                <InlineTooltip id="tooltip-metres" tooltip="A metre is about the length of a big step for an adult. 1000 metres = 1 kilometre.">
                    metres
                </InlineTooltip>{" "}
                (m) or{" "}
                <InlineTooltip id="tooltip-kilometres" tooltip="A kilometre is 1000 metres. It's used for longer distances like roads.">
                    kilometres
                </InlineTooltip>{" "}
                (km).
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive distance example
    <SplitLayout key="layout-distance-interactive" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="distance-interactive-text" padding="sm">
                <EditableParagraph id="para-distance-interactive-text" blockId="distance-interactive-text">
                    Let's explore distance! Imagine you're walking to school. The distance you walk is{" "}
                    <InlineScrubbleNumber
                        varName="distanceWalked"
                        {...numberPropsFromDefinition(getVariableInfo('distanceWalked'))}
                    />{" "}
                    metres. Try changing this number by dragging it left or right. Watch how the walking person moves further or closer!
                </EditableParagraph>
            </Block>
            <Block id="distance-explanation" padding="sm">
                <EditableParagraph id="para-distance-explanation" blockId="distance-explanation">
                    Think about it: 100 metres is about the length of a running track. 500 metres is about 5 times around a running track. The bigger the number, the further the distance!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="distance-visualization" padding="sm" hasVisualization>
            <DistanceVisualization />
        </Block>
    </SplitLayout>,

    // Real world distance examples with image
    <StackLayout key="layout-distance-examples-image" maxWidth="xl">
        <Block id="distance-examples-image" padding="sm">
            <ImageDisplay
                src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800"
                alt="A running track at a sports field"
                caption="A running track is usually 400 metres around — that's almost half a kilometre!"
                bordered
            />
        </Block>
    </StackLayout>,

    // Distance fun facts
    <StackLayout key="layout-distance-fun-facts" maxWidth="xl">
        <Block id="distance-fun-facts" padding="sm">
            <EditableParagraph id="para-distance-fun-facts" blockId="distance-fun-facts">
                Here are some fun distance facts: Your classroom might be about 10 metres long. A football pitch is about 100 metres long. And the distance from London to Paris is about 340 kilometres — that's 340,000 metres!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
