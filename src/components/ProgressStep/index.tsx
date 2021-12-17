import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

interface Props {
	steps: number,
	currentStep: number
}

export const ProgressStep = (props: Props): React.ReactElement => {
	const steps = new Array(props.steps).fill(0);
	return (
		<div className="progress-step">
			<ProgressBar
				width={`${100 / props.steps * (props.steps - 1)}%`}
				percent={(props.currentStep - 1) / (props.steps - 1) * 100}
			>
				{steps.map((step, index) =>
					<Step
						position={100 * (index / props.steps)}
						transition="scale"
						children={({ accomplished }) => (
							<div className={`progress-label ${accomplished && 'active'}`}>{index + 1}</div>
						)}
					/>
				)}
			</ProgressBar>
		</div>
	)
}

// const ProgressLabel = (props: { value: string }): React.ReactElement => {
// 	return (
// 		<div className="progress-label">{props.value}</div>
// 	)
// }