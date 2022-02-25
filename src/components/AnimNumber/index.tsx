import React, { useEffect, useState } from "react";
import { formatBigNumber, sleep } from "utils";
import { BigNumber, ethers } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";

interface Props {
	value: BigNumber,
	precision: number,
	decimals: number,
	duration?: number,
	isDecimalSpan?: boolean
}

export const AnimNumber = (props: Props): React.ReactElement => {
	const [value, setValue] = useState(ethers.constants.Zero)
	const [step, setStep] = useState(0);

	useEffect(() => {
		setStep(0);
	}, [props.value])

	useEffect(() => {
		if (step >= 100) return;
		const upDir = BigNumber.from(props.value).gt(value);
		const delta = upDir ? BigNumber.from(props.value).sub(value) : BigNumber.from(value).sub(props.value);
		const increment = delta.div(10);
		const newValue = upDir ? increment.add(value) : BigNumber.from(value).sub(increment)
		setValue(newValue);

		const duration = (props.duration || 1) * 1000;
		sleep(duration / 100).then(() => {
			setStep(step + 1);
		})
	}, [step])// eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{
				props.isDecimalSpan ?
					<DecimalSpan value={formatBigNumber(value, props.precision, props.decimals)} />
					:
					formatBigNumber(value, props.precision, props.decimals)
			}
		</>
	)
}