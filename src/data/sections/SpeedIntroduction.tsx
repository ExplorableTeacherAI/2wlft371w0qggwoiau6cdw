import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableH2, EditableParagraph, InlineTooltip } from "@/components/atoms";
import { ImageDisplay } from "@/components/atoms";

export const speedIntroductionBlocks: ReactElement[] = [
    // Main Title
    <StackLayout key="layout-speed-title" maxWidth="xl">
        <Block id="speed-title" padding="md">
            <EditableH1 id="h1-speed-title" blockId="speed-title">
                What is Speed?
            </EditableH1>
        </Block>
    </StackLayout>,

    // Introduction paragraph - engaging opening
    <StackLayout key="layout-speed-intro-hook" maxWidth="xl">
        <Block id="speed-intro-hook" padding="sm">
            <EditableParagraph id="para-speed-intro-hook" blockId="speed-intro-hook">
                Imagine you're watching a race between a snail and a cheetah. Who would win? Of course, the cheetah! But why? The cheetah is much, much faster. Today, we're going to learn exactly what "fast" means in maths. We call it{" "}
                <InlineTooltip id="tooltip-speed-definition" tooltip="Speed tells us how quickly something moves from one place to another.">
                    speed
                </InlineTooltip>
                !
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Race image
    <StackLayout key="layout-speed-race-image" maxWidth="xl">
        <Block id="speed-race-image" padding="sm">
            <ImageDisplay
                src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800"
                alt="A cheetah running fast"
                caption="A cheetah can run very fast — up to 120 km/h!"
                bordered
            />
        </Block>
    </StackLayout>,

    // Explanation of speed concept
    <StackLayout key="layout-speed-concept-explanation" maxWidth="xl">
        <Block id="speed-concept-explanation" padding="sm">
            <EditableParagraph id="para-speed-concept-explanation" blockId="speed-concept-explanation">
                Speed is all about two things: how far something travels (we call this{" "}
                <InlineTooltip id="tooltip-distance" tooltip="Distance is how far something moves, measured in metres, kilometres, or other units.">
                    distance
                </InlineTooltip>
                ) and how long it takes (we call this{" "}
                <InlineTooltip id="tooltip-time" tooltip="Time is how long something takes, measured in seconds, minutes, or hours.">
                    time
                </InlineTooltip>
                ). When something moves a long distance in a short time, we say it has a high speed. When something moves slowly, it takes a long time to travel the same distance.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Real-life examples
    <StackLayout key="layout-speed-examples-heading" maxWidth="xl">
        <Block id="speed-examples-heading" padding="sm">
            <EditableH2 id="h2-speed-examples-heading" blockId="speed-examples-heading">
                Speed is Everywhere!
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-speed-examples-text" maxWidth="xl">
        <Block id="speed-examples-text" padding="sm">
            <EditableParagraph id="para-speed-examples-text" blockId="speed-examples-text">
                You already know about speed from everyday life! When you walk to school, you move at a certain speed. When you ride your bike, you go faster. Cars on the motorway go even faster. And aeroplanes? They're super speedy! Let's learn how to measure and calculate speed so you can compare how fast different things move.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
