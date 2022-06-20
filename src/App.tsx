import { Card, InputNumber, Radio, RadioChangeEvent, Typography } from 'antd';
import { useState } from 'react';


interface Pipelines {
  noPipeline: number;
  singlePipeline: number;
  superPipeline: number;
  superScalar: number;
}

function App() {
  const { Title, Paragraph } = Typography;

  const defaultValues = {
    noPipeline: 0,
    singlePipeline: 0,
    superPipeline: 0,
    superScalar: 0,
  }

  const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
  };

  const [resultPipes, setResultPipes] = useState<Pipelines>(defaultValues);
  const [timeState, setTimeState] = useState<number>(0);
  const [numsState, setNumsState] = useState<number>(0);
  const [radioValue, setRadioValue] = useState(0);

  const onChangeRadioState = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  function calcTime(numbers: number): Pipelines {
    // Calculate without Pipeline:
    const noPipeline = numbers * 5;

    // Calculate simple Pipeline:
    const singlePipeline = numbers + 4;

    // Calculate SuperPipeline:
    const superPipeline = 4+(numbers/1.5);

    // Calculate SuperScalar
    const superScalar = (numbers-2)/2

    return ({noPipeline, singlePipeline, superPipeline, superScalar});
  }

  function calcNums(time:number): Pipelines {
    // Calculate without Pipeline:
    const noPipeline = time/5;

    // Calculate simple Pipeline:
    const singlePipeline = time - 4;

    // Calculate SuperPipeline:
    const superPipeline = 4 - (time * 1.5);

    const superScalar = (time+2)*2

    return ({noPipeline, singlePipeline, superPipeline, superScalar});
  }

  return (
    <div className="App">
      <Title>
        Pipelator
      </Title>
      <Paragraph>
        Maybe the best way to calculate this... Thing.
      </Paragraph>
      <Card title="Formulas:">
        <Card.Grid style={gridStyle}>
          <p>
            <b>Sem Pipeline:</b>
          </p>
          <p>
            {numsState <= 0 ? ("t") : (resultPipes?.noPipeline)} = {numsState}*5
          </p>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <p>
            <b>Pipeline Simples:</b>
          </p>
          <p>
            {numsState <= 0 ? ("t") : (resultPipes?.singlePipeline)} = {numsState}+4
          </p>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <p>
            <b>Super Pipeline:</b>
          </p>
          <p>
          {numsState <= 0 ? ("t") : (resultPipes?.superPipeline)} = 4+({numsState}/1,5)
          </p>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <p>
            <b>Super Scalar:</b>
          </p>
          <p>
          {numsState <= 0 ? ("t") : (resultPipes?.superScalar)} = 4+({numsState}/1,5)
          </p>
        </Card.Grid>
      </Card>
      <div className="center">
      <Radio.Group onChange={onChangeRadioState} value={radioValue}>
        <Radio value={0}>Calcular tempo (t)</Radio>
        <Radio value={1}>Calcular numero de intruções (n)</Radio>
      </Radio.Group>
      <br/>
      {radioValue === 0 ? (
      <InputNumber
        placeholder='Number of instructions'
        min={0}
        onChange={ event =>{
          console.log(setResultPipes(calcTime(event)));
          setNumsState(event);
        }}
        style={{width: "100%"}}
        />
        ) : (
          <InputNumber
            placeholder='Time of the execution'
            min={0}
            onChange={ event =>{
              // console.log(calcNums(event));
            }}
          />
        )}
      </div>
      
    </div>
  );
}

export default App;
