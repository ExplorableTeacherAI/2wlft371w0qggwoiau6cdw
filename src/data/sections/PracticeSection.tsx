import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineClozeInput, InlineClozeChoice, InlineFeedback } from "@/components/atoms";
import { getVariableInfo, clozePropsFromDefinition, choicePropsFromDefinition } from "../variables";

export const practiceSectionBlocks: ReactElement[] = [
    // Section Title
    <StackLayout key="layout-practice-title" maxWidth="xl">
        <Block id="practice-title" padding="md">
            <EditableH2 id="h2-practice-title" blockId="practice-title">
                Practice Time! 🎯
            </EditableH2>
        </Block>
    </StackLayout>,

    // Practice intro
    <StackLayout key="layout-practice-intro" maxWidth="xl">
        <Block id="practice-intro" padding="sm">
            <EditableParagraph id="para-practice-intro" blockId="practice-intro">
                Now it's your turn! Let's practise using the speed formula. Remember: Speed = Distance ÷ Time. Fill in the blanks to test your knowledge!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 1: Basic speed calculation
    <StackLayout key="layout-practice-question-one" maxWidth="xl">
        <Block id="practice-question-one" padding="md">
            <EditableParagraph id="para-practice-question-one" blockId="practice-question-one">
                <strong>Question 1:</strong> A cyclist travels 50 metres in 10 seconds. What is their speed?{" "}
                <InlineFeedback
                    varName="answerSpeedQuestion1"
                    correctValue="5"
                    position="terminal"
                    successMessage="— brilliant! You divided 50 by 10 correctly"
                    failureMessage="— not quite."
                    hint="Divide the distance (50m) by the time (10s)"
                    reviewBlockId="formula-explanation"
                    reviewLabel="Review the speed formula"
                >
                    <InlineClozeInput
                        varName="answerSpeedQuestion1"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo('answerSpeedQuestion1'))}
                    />
                </InlineFeedback>{" "}
                m/s.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 2: Another speed calculation
    <StackLayout key="layout-practice-question-two" maxWidth="xl">
        <Block id="practice-question-two" padding="md">
            <EditableParagraph id="para-practice-question-two" blockId="practice-question-two">
                <strong>Question 2:</strong> A runner covers 40 metres in 5 seconds. What is their speed?{" "}
                <InlineFeedback
                    varName="answerSpeedQuestion2"
                    correctValue="8"
                    position="terminal"
                    successMessage="— excellent! 40 ÷ 5 = 8 m/s, that's faster than most people!"
                    failureMessage="— try again."
                    hint="Use the formula: Speed = Distance ÷ Time"
                    reviewBlockId="formula-explanation"
                    reviewLabel="Review the speed formula"
                >
                    <InlineClozeInput
                        varName="answerSpeedQuestion2"
                        correctAnswer="8"
                        {...clozePropsFromDefinition(getVariableInfo('answerSpeedQuestion2'))}
                    />
                </InlineFeedback>{" "}
                m/s.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 3: Find the distance
    <StackLayout key="layout-practice-question-three" maxWidth="xl">
        <Block id="practice-question-three" padding="md">
            <EditableParagraph id="para-practice-question-three" blockId="practice-question-three">
                <strong>Question 3:</strong> A car travels at a speed of 20 m/s for 3 seconds. How far does it travel? Distance ={" "}
                <InlineFeedback
                    varName="answerDistanceQuestion"
                    correctValue="60"
                    position="terminal"
                    successMessage="— perfect! Speed × Time = 20 × 3 = 60 metres"
                    failureMessage="— have another go."
                    hint="Distance = Speed × Time. Multiply 20 by 3"
                >
                    <InlineClozeInput
                        varName="answerDistanceQuestion"
                        correctAnswer="60"
                        {...clozePropsFromDefinition(getVariableInfo('answerDistanceQuestion'))}
                    />
                </InlineFeedback>{" "}
                metres.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 4: Find the time
    <StackLayout key="layout-practice-question-four" maxWidth="xl">
        <Block id="practice-question-four" padding="md">
            <EditableParagraph id="para-practice-question-four" blockId="practice-question-four">
                <strong>Question 4:</strong> A rabbit runs 100 metres at a speed of 20 m/s. How long does it take? Time ={" "}
                <InlineFeedback
                    varName="answerTimeQuestion"
                    correctValue="5"
                    position="terminal"
                    successMessage="— fantastic! Time = Distance ÷ Speed = 100 ÷ 20 = 5 seconds"
                    failureMessage="— not quite right."
                    hint="Time = Distance ÷ Speed. Divide 100 by 20"
                >
                    <InlineClozeInput
                        varName="answerTimeQuestion"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo('answerTimeQuestion'))}
                    />
                </InlineFeedback>{" "}
                seconds.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 5: Unit choice
    <StackLayout key="layout-practice-question-five" maxWidth="xl">
        <Block id="practice-question-five" padding="md">
            <EditableParagraph id="para-practice-question-five" blockId="practice-question-five">
                <strong>Question 5:</strong> Cars on the motorway usually have their speed measured in{" "}
                <InlineFeedback
                    varName="answerUnitChoice"
                    correctValue="km/h"
                    position="terminal"
                    successMessage="— correct! Kilometres per hour is perfect for car journeys"
                    failureMessage="— think about what unit you see on car speedometers."
                    hint="Look at a car speedometer. What unit do they usually show?"
                    reviewBlockId="units-speedometer-image"
                    reviewLabel="Look at the speedometer image"
                >
                    <InlineClozeChoice
                        varName="answerUnitChoice"
                        correctAnswer="km/h"
                        options={["m/s", "km/h", "cm/s"]}
                        {...choicePropsFromDefinition(getVariableInfo('answerUnitChoice'))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Completion message
    <StackLayout key="layout-practice-complete" maxWidth="xl">
        <Block id="practice-complete" padding="md">
            <EditableParagraph id="para-practice-complete" blockId="practice-complete">
                Great job working through these problems! Remember, the speed formula is your friend: Speed = Distance ÷ Time. You can rearrange it to find distance (Distance = Speed × Time) or time (Time = Distance ÷ Speed). Keep practising and you'll be a speed expert in no time! 🚀
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
