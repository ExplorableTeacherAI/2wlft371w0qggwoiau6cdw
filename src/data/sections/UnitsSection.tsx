import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, GridLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineScrubbleNumber, InlineTooltip } from "@/components/atoms";
import { ImageDisplay } from "@/components/atoms";
import { getVariableInfo, numberPropsFromDefinition } from "../variables";
import { useVar } from "@/stores";

// Speed comparison cards data
const speedExamples = [
    { name: 'Garden Snail', speed: 0.03, unit: 'm/s', emoji: '🐌', color: '#94a3b8' },
    { name: 'Walking Human', speed: 1.4, unit: 'm/s', emoji: '🚶', color: '#A8D5A2' },
    { name: 'Usain Bolt', speed: 10.4, unit: 'm/s', emoji: '🏃', color: '#F7B23B' },
    { name: 'Car in Town', speed: 50, unit: 'km/h', emoji: '🚗', color: '#8E90F5' },
    { name: 'Cheetah', speed: 120, unit: 'km/h', emoji: '🐆', color: '#F4A89A' },
    { name: 'Aeroplane', speed: 900, unit: 'km/h', emoji: '✈️', color: '#AC8BF9' },
];

// Reactive unit converter visualization
function UnitConverterVisualization() {
    const speedMS = useVar('speedValue', 10) as number;

    // Convert m/s to km/h: multiply by 3.6
    const speedKMH = speedMS * 3.6;

    return (
        <div className="bg-white rounded-lg p-4 border border-slate-200">
            {/* Converter display */}
            <div className="grid grid-cols-2 gap-4">
                {/* m/s side */}
                <div className="text-center p-4 bg-violet-50 rounded-lg">
                    <div className="text-3xl font-bold text-violet-600">{speedMS}</div>
                    <div className="text-sm text-violet-500 mt-1">metres per second</div>
                    <div className="text-lg font-medium text-violet-400">(m/s)</div>
                </div>

                {/* Equals sign */}
                <div className="flex items-center justify-center">
                    <span className="text-2xl text-slate-400">=</span>
                </div>
            </div>

            <div className="text-center my-4">
                <span className="text-slate-500">×3.6</span>
                <div className="w-16 h-0.5 bg-slate-300 mx-auto mt-1"></div>
            </div>

            {/* km/h result */}
            <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-3xl font-bold text-teal-600">{speedKMH.toFixed(1)}</div>
                <div className="text-sm text-teal-500 mt-1">kilometres per hour</div>
                <div className="text-lg font-medium text-teal-400">(km/h)</div>
            </div>

            {/* Real world comparison */}
            <div className="mt-4 p-3 bg-amber-50 rounded-lg text-center text-sm">
                {speedMS < 2 && <span>🚶 That's about walking speed!</span>}
                {speedMS >= 2 && speedMS < 5 && <span>🏃 That's a jogging pace!</span>}
                {speedMS >= 5 && speedMS < 12 && <span>🏃‍♂️ That's sprinting speed!</span>}
                {speedMS >= 12 && speedMS < 30 && <span>🚴 That's faster than most cyclists!</span>}
                {speedMS >= 30 && speedMS < 50 && <span>🚗 That's car speed in a town!</span>}
                {speedMS >= 50 && <span>🚀 That's super fast! Like a car on a motorway!</span>}
            </div>
        </div>
    );
}

export const unitsSectionBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-units-title" maxWidth="xl">
        <Block id="units-title" padding="md">
            <EditableH2 id="h2-units-title" blockId="units-title">
                Units of Speed
            </EditableH2>
        </Block>
    </StackLayout>,

    // Units introduction
    <StackLayout key="layout-units-intro" maxWidth="xl">
        <Block id="units-intro" padding="sm">
            <EditableParagraph id="para-units-intro" blockId="units-intro">
                Speed is measured in different{" "}
                <InlineTooltip id="tooltip-units" tooltip="Units tell us what we're measuring with — like metres for distance or seconds for time.">
                    units
                </InlineTooltip>
                . The most common ones are{" "}
                <InlineTooltip id="tooltip-ms" tooltip="Metres per second — how many metres something travels in one second. Good for short distances.">
                    metres per second (m/s)
                </InlineTooltip>{" "}
                and{" "}
                <InlineTooltip id="tooltip-kmh" tooltip="Kilometres per hour — how many kilometres something travels in one hour. Used for cars and longer journeys.">
                    kilometres per hour (km/h)
                </InlineTooltip>
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Unit explanation
    <StackLayout key="layout-units-explanation" maxWidth="xl">
        <Block id="units-explanation" padding="sm">
            <EditableParagraph id="para-units-explanation" blockId="units-explanation">
                Think of it this way: m/s tells us how many metres something travels in one second. km/h tells us how many kilometres something travels in one hour. We use m/s for quick things like running, and km/h for longer journeys like driving.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Car speedometer image
    <StackLayout key="layout-units-speedometer-image" maxWidth="xl">
        <Block id="units-speedometer-image" padding="sm">
            <ImageDisplay
                src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800"
                alt="A car speedometer showing speed in km/h"
                caption="Car speedometers usually show speed in kilometres per hour (km/h)"
                bordered
            />
        </Block>
    </StackLayout>,

    // Unit converter
    <StackLayout key="layout-units-converter-heading" maxWidth="xl">
        <Block id="units-converter-heading" padding="sm">
            <EditableParagraph id="para-units-converter-heading" blockId="units-converter-heading">
                Let's convert between units! Try changing the speed below. If something travels at{" "}
                <InlineScrubbleNumber
                    varName="speedValue"
                    {...numberPropsFromDefinition(getVariableInfo('speedValue'))}
                />{" "}
                metres per second, we can convert it to kilometres per hour by multiplying by 3.6.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-units-converter-viz" maxWidth="md">
        <Block id="units-converter-viz" padding="sm" hasVisualization>
            <UnitConverterVisualization />
        </Block>
    </StackLayout>,

    // Speed examples heading
    <StackLayout key="layout-speed-examples-heading" maxWidth="xl">
        <Block id="speed-examples-heading" padding="sm">
            <EditableH2 id="h2-speed-examples-heading" blockId="speed-examples-heading">
                How Fast Are Different Things?
            </EditableH2>
        </Block>
    </StackLayout>,

    // Speed comparison cards
    <GridLayout key="layout-speed-cards" columns={3} gap="md">
        {speedExamples.map((example, index) => (
            <Block key={`speed-card-${index}`} id={`speed-card-${example.name.toLowerCase().replace(/\s+/g, '-')}`} padding="sm">
                <div
                    className="p-4 rounded-lg text-center border-2"
                    style={{ borderColor: example.color, backgroundColor: `${example.color}15` }}
                >
                    <div className="text-4xl mb-2">{example.emoji}</div>
                    <div className="font-bold text-slate-700">{example.name}</div>
                    <div className="text-2xl font-bold mt-2" style={{ color: example.color }}>
                        {example.speed} {example.unit}
                    </div>
                </div>
            </Block>
        ))}
    </GridLayout>,

    // Summary
    <StackLayout key="layout-units-summary" maxWidth="xl">
        <Block id="units-summary" padding="sm">
            <EditableParagraph id="para-units-summary" blockId="units-summary">
                Amazing, right? A garden snail moves at just 0.03 m/s, while an aeroplane zooms along at 900 km/h! That's why choosing the right unit matters. We wouldn't measure a snail's speed in km/h because the number would be tiny (0.0001 km/h). And we wouldn't measure a plane's speed in m/s because it would be a huge number (250 m/s)!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
