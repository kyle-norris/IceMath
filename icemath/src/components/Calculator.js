import React, { useState } from "react";
import {
  Input,
  Container,
  Dropdown,
  Header,
  Grid,
  Button,
  Segment
} from "semantic-ui-react";
import * as styles from "./Calculator.module.css"

const waterUnits = [
  { key: "kg", text: "kg", value: "kg" },
  { key: "g", text: "g", value: "g" },
  { key: "gal", text: "gal", value: "gal" },
];

const tempUnits = [
  { key: "F", text: "F", value: "F" },
  { key: "C", text: "C", value: "C" },
];

const Calculator = () => {
  const [waterParams, setWaterParams] = useState({
    amount: {
      value: 0,
      units: "gal",
    },
    temp_start: {
      value: 0,
      units: "C",
    },
    temp_finish: {
      value: 0,
      units: "C",
    },
  });
  const [ice, setIce] = useState(0);

  const onWaterAmountChange = (e, data) => {
    var newWater = waterParams;
    newWater.amount.value = data.value;
    setWaterParams(newWater);
  };

  const onWaterTempStartChange = (e, data) => {
    var newWater = waterParams;
    newWater.temp_start.value = data.value;
    setWaterParams(newWater);
  };

  const onWaterTempFinishChange = (e, data) => {
    var newWater = waterParams;
    newWater.temp_finish.value = data.value;
    setWaterParams(newWater);
  };

  const OnWaterAmountUnitsChange = (e, data) => {
    var newWater = waterParams;
    newWater.amount.units = data.value;
    setWaterParams(newWater);
  };

  const OnWaterTempStartUnitsChange = (e, data) => {
    var newWater = waterParams;
    newWater.temp_start.units = data.value;
    setWaterParams(newWater);
  };

  const OnWaterTempFinishUnitsChange = (e, data) => {
    var newWater = waterParams;
    newWater.temp_finish.units = data.value;
    setWaterParams(newWater);
  };

  const calculateIce = () => {
    var t_s = waterParams.temp_start.value;
    var t_f = waterParams.temp_finish.value;
    var m_w = waterParams.amount.value;

    switch (waterParams.amount.units) {
      case 'g':
        break;
      case 'gal':
        m_w *= 3785.4118;
        break;
      case 'kg':
        m_w *= 1000;
        break;
    }

    if (waterParams.temp_start.units === 'F') {
      t_s = (t_s - 32) * 5/9
    }

    if (waterParams.temp_finish.units === 'F') {
      t_f = (t_f - 32) * 5/9
    }

    var result = (4.186 * m_w * (t_s - t_f)) / (334 + 4.186* t_f);

    switch (waterParams.amount.units) {
      case 'g':
        break;
      case 'gal':
        result /= 3785.4118;
        break;
      case 'kg':
        result /= 1000;
        break;
    }


    result = Math.round(result * 10) / 10
    console.log(result);
    setIce(result);
  };

  return (
    <Container className={styles.container}>
      <Header content="Inputs" textAlign="center" />
      <Grid columns={1} centered>
        <Grid.Row>
          <Input
            label="Amount of Water:"
            fluid
            onChange={onWaterAmountChange}
            action={
              <Dropdown
                button
                basic
                floating
                options={waterUnits}
                defaultValue="gal"
                onChange={OnWaterAmountUnitsChange}
              />
            }
            style={{ width: "350px" }}
          ></Input>
        </Grid.Row>
        <Grid.Row>
          <Input
            label="Starting Temperature:"
            fluid
            onChange={onWaterTempStartChange}
            action={
              <Dropdown
                button
                basic
                floating
                options={tempUnits}
                defaultValue="C"
                onChange={OnWaterTempStartUnitsChange}
              />
            }
            style={{ width: "350px" }}
          ></Input>
        </Grid.Row>
        <Grid.Row>
          <Input
            label="Desired Temperature:"
            fluid
            onChange={onWaterTempFinishChange}
            action={
              <Dropdown
                button
                basic
                floating
                options={tempUnits}
                defaultValue="C"
                onChange={OnWaterTempFinishUnitsChange}
              />
            }
            style={{ width: "350px" }}
          ></Input>
        </Grid.Row>
        <Grid.Row>
          <Button primary content="Calculate" onClick={calculateIce} />
        </Grid.Row>
        <Grid.Row>
          <Segment content={ice + waterParams.amount.units}/>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Calculator;
