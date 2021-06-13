import React, { useState } from "react";
import {
  Input,
  Container,
  Dropdown,
  Header,
  Grid,
  Button,
  Segment,
} from "semantic-ui-react";
import * as styles from "./Calculator.module.css";
import * as calc from "../calculations/calculations.js";

const waterUnits = [
  { key: "kg", text: "kg", value: "kg" },
  { key: "g", text: "g", value: "g" },
  { key: "gal", text: "gal", value: "gal" },
];

const iceUnits = [
  { key: "kg", text: "kg", value: "kg" },
  { key: "g", text: "g", value: "g" },
  { key: "gal", text: "gal", value: "gal" },
  { key: "lbs", text: "lbs", value: "lbs"},
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
    result: {
      units: "lbs"
    }
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

  const OnIceUnitsChange = (e, data) => {
    var newWater = waterParams;
    newWater.result.units = data.value;
    setWaterParams(newWater);
    calculateIce();
  }

  const calculateIce = () => {
    var result = calc.calculateIce(
      waterParams.temp_start.value,
      waterParams.temp_start.units,
      waterParams.temp_finish.value,
      waterParams.temp_finish.units,
      waterParams.amount.value,
      waterParams.amount.units,
      waterParams.result.units
    );
    console.log("Result:" + result);
    setIce(result);
  };

  return (
    <Container className={styles.container}>
      <Header content="How much ice do I need?" textAlign="center" />
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
          <Container horizontal>
            {"You need "}<b>{ice}</b>{" "}
            <Dropdown
                button
                basic
                floating
                options={iceUnits}
                defaultValue="lbs"
                onChange={OnIceUnitsChange}
              ></Dropdown>
              {" of ice."}
              
          </Container>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Calculator;
