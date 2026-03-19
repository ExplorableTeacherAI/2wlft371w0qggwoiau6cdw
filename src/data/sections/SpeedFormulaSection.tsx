import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineScrubbleNumber, InlineSpotColor, InlineToggle } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { getVariableInfo, numberPropsFromDefinition, togglePropsFromDefinition, scrubVarsFromDefinitions } from "../variables";
import { useVar } from "@/stores";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHintSequence";

// Animal data with speeds and emojis
const animalData: Record<string, { emoji: string; typicalSpeed: number; name: string; color: string }> = {
    snail: { emoji: '🐌', typicalSpeed: 0.03, name: 'Snail', color: '#94a3b8' },
    tortoise: { emoji: '🐢', typicalSpeed: 0.3, name: 'Tortoise', color: '#A8D5A2' },
    rabbit: { emoji: '🐰', typicalSpeed: 15, name: 'Rabbit', color: '#F7B23B' },
    cheetah: { emoji: '🐆', typicalSpeed: 30, name: 'Cheetah', color: '#F4A89A' },
};

// Reactive component for the animal race visualization
function AnimalRaceVisualization() {
    const distance = useVar('raceDistance', 100) as number;
    const time = useVar('raceTime', 10) as number;
    const selectedAnimal = useVar('selectedAnimal', 'rabbit') as string;

    // Calculate speed
    const speed = time > 0 ? distance / time : 0;

    // Get animal info
    const animal = animalData[selectedAnimal] || animalData.rabbit;

    // Calculate race positions based on speed comparison
    // Each animal moves according to their typical speed over the same time
    const getAnimalPosition = (animalKey: string) => {
        const a = animalData[animalKey];
        // How far would this animal travel in the given time?
        const distanceTraveled = a.typicalSpeed * time;
        // Position as percentage of race distance
        return Math.min((distanceTraveled / distance) * 100, 100);
    };

    return (
        <div className="relative bg-white rounded-lg p-4 border border-slate-200">
            {/* Race header */}
            <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-slate-700">🏁 Animal Race!</h3>
                <p className="text-sm text-slate-500">Race distance: {distance}m • Time: {time}s</p>
            </div>

            {/* Race tracks */}
            <div className="space-y-3">
                {Object.entries(animalData).map(([key, data]) => {
                    const position = getAnimalPosition(key);
                    const isSelected = key === selectedAnimal;
                    const finished = position >= 100;

                    return (
                        <div key={key} className={`relative ${isSelected ? 'scale-105' : ''} transition-transform`}>
                            {/* Animal label */}
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm font-medium ${isSelected ? 'text-amber-600' : 'text-slate-600'}`}>
                                    {data.emoji} {data.name}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {data.typicalSpeed} m/s
                                </span>
                            </div>

                            {/* Track */}
                            <div className={`relative h-10 rounded-lg overflow-hidden ${isSelected ? 'ring-2 ring-amber-400' : ''}`}
                                style={{ backgroundColor: `${data.color}20` }}>
                                {/* Progress bar */}
                                <div
                                    className="absolute top-0 left-0 h-full transition-all duration-700 ease-out rounded-lg"
                                    style={{
                                        width: `${position}%`,
                                        backgroundColor: `${data.color}40`,
                                    }}
                                />

                                {/* Animal */}
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 text-2xl transition-all duration-700 ease-out"
                                    style={{ left: `calc(${Math.min(position, 95)}% - 12px)` }}
                                >
                                    {data.emoji}
                                </div>

                                {/* Finish flag */}
                                <div className="absolute right-1 top-1/2 -translate-y-1/2 text-lg">
                                    {finished ? '🏆' : '🏁'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Speed calculation display */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2">
                        To travel <span className="font-bold text-teal-600">{distance}m</span> in{" "}
                        <span className="font-bold text-indigo-500">{time}s</span>, you need a speed of:
                    </p>
                    <div className="text-3xl font-bold text-violet-600">
                        {speed.toFixed(1)} m/s
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                        (metres per second)
                    </p>
                </div>
            </div>

            {/* Who wins? */}
            <div className="mt-4 p-3 bg-amber-50 rounded-lg text-center">
                <p className="text-sm text-amber-800">
                    {speed >= 30 ? '🐆 Only a cheetah could reach that speed!' :
                        speed >= 15 ? '🐰 A rabbit could make it!' :
                            speed >= 0.3 ? '🐢 Even a tortoise could do this!' :
                                '🐌 A snail pace!'}
                </p>
            </div>
        </div>
    );
}

export const speedFormulaSectionBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-formula-title" maxWidth="xl">
        <Block id="formula-title" padding="md">
            <EditableH2 id="h2-formula-title" blockId="formula-title">
                The Speed Formula
            </EditableH2>
        </Block>
    </StackLayout>,

    // Formula introduction
    <StackLayout key="layout-formula-intro" maxWidth="xl">
        <Block id="formula-intro" padding="sm">
            <EditableParagraph id="para-formula-intro" blockId="formula-intro">
                Now we know about{" "}
                <InlineSpotColor varName="raceDistance" color="#62D0AD">
                    distance
                </InlineSpotColor>{" "}
                and{" "}
                <InlineSpotColor varName="raceTime" color="#8E90F5">
                    time
                </InlineSpotColor>
                , we can put them together to find{" "}
                <InlineSpotColor varName="speedValue" color="#AC8BF9">
                    speed
                </InlineSpotColor>
                ! Here's the magic formula:
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The Formula
    <StackLayout key="layout-speed-formula-display" maxWidth="xl">
        <Block id="speed-formula-display" padding="md">
            <FormulaBlock
                latex="\clr{speed}{Speed} = \frac{\clr{distance}{Distance}}{\clr{time}{Time}}"
                colorMap={{
                    speed: '#AC8BF9',
                    distance: '#62D0AD',
                    time: '#8E90F5',
                }}
            />
        </Block>
    </StackLayout>,

    // Formula explanation
    <StackLayout key="layout-formula-explanation" maxWidth="xl">
        <Block id="formula-explanation" padding="sm">
            <EditableParagraph id="para-formula-explanation" blockId="formula-explanation">
                This formula says: to find speed, we divide the distance by the time. For example, if you walk 100 metres in 20 seconds, your speed is 100 ÷ 20 = 5 metres per second. That means you travel 5 metres every single second!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive animal race
    <StackLayout key="layout-animal-race-heading" maxWidth="xl">
        <Block id="animal-race-heading" padding="sm">
            <EditableH2 id="h2-animal-race-heading" blockId="animal-race-heading">
                Let's Race! 🏁
            </EditableH2>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-animal-race-interactive" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="animal-race-controls" padding="sm">
                <EditableParagraph id="para-animal-race-controls" blockId="animal-race-controls">
                    Time for an animal race! Set the race{" "}
                    <InlineSpotColor varName="raceDistance" color="#62D0AD">
                        distance
                    </InlineSpotColor>{" "}
                    to{" "}
                    <InlineScrubbleNumber
                        varName="raceDistance"
                        {...numberPropsFromDefinition(getVariableInfo('raceDistance'))}
                    />{" "}
                    metres and the{" "}
                    <InlineSpotColor varName="raceTime" color="#8E90F5">
                        time
                    </InlineSpotColor>{" "}
                    to{" "}
                    <InlineScrubbleNumber
                        varName="raceTime"
                        {...numberPropsFromDefinition(getVariableInfo('raceTime'))}
                    />{" "}
                    seconds.
                </EditableParagraph>
            </Block>
            <Block id="animal-race-guide" padding="sm">
                <EditableParagraph id="para-animal-race-guide" blockId="animal-race-guide">
                    Watch the animals race! Each animal moves at their natural speed. The{" "}
                    <InlineToggle
                        id="toggle-selected-animal"
                        varName="selectedAnimal"
                        options={["snail", "tortoise", "rabbit", "cheetah"]}
                        {...togglePropsFromDefinition(getVariableInfo('selectedAnimal'))}
                    />{" "}
                    is highlighted. See which animals can finish the race in time!
                </EditableParagraph>
            </Block>
            <Block id="animal-race-insight" padding="sm">
                <EditableParagraph id="para-animal-race-insight" blockId="animal-race-insight">
                    Notice how the speed needed changes when you adjust distance and time. A longer distance needs a faster speed to finish in the same time. More time means you can go slower and still finish!
                </EditableParagraph>
            </Block>
        </div>
        <Block id="animal-race-visualization" padding="sm" hasVisualization>
            <div className="relative">
                <AnimalRaceVisualization />
                <InteractionHintSequence
                    hintKey="animal-race-scrub"
                    steps={[
                        {
                            gesture: "drag-horizontal",
                            label: "Drag the distance and time numbers to change the race",
                            position: { x: "20%", y: "20%" },
                        },
                    ]}
                />
            </div>
        </Block>
    </SplitLayout>,

    // Interactive formula calculation
    <StackLayout key="layout-formula-calculate" maxWidth="xl">
        <Block id="formula-calculate" padding="md">
            <FormulaBlock
                latex="\clr{speed}{Speed} = \frac{\scrub{raceDistance}}{\scrub{raceTime}}"
                colorMap={{
                    speed: '#AC8BF9',
                }}
                variables={scrubVarsFromDefinitions(['raceDistance', 'raceTime'])}
            />
        </Block>
    </StackLayout>,

    // Key takeaway
    <StackLayout key="layout-formula-takeaway" maxWidth="xl">
        <Block id="formula-takeaway" padding="sm">
            <EditableParagraph id="para-formula-takeaway" blockId="formula-takeaway">
                Remember: Speed = Distance ÷ Time. If you know any two of these values, you can always find the third! A cheetah has a high speed because it covers a lot of distance in a short time. A snail has a low speed because it covers very little distance, even if you give it lots of time.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
