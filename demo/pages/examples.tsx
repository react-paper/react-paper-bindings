import React, { useCallback, useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { Form, Toggle } from "react-daisyui";
import {
  Canvas,
  View,
  Layer,
  Circle,
  Rectangle,
  CompoundPath,
} from "react-paper-bindings";
import { Container } from "components/content";

function move(arr: any[], from: number, to: number) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) prev.push(current);
    if (idx === from) return prev;
    if (from < to) prev.push(current);
    if (idx === to) prev.push(self[from]);
    if (from > to) prev.push(current);
    return prev;
  }, []);
}

const Examples: NextPage = () => {
  const [animating, setAnimating] = useState(true);
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [color, setColor] = useState("blue");
  const [color2, setColor2] = useState("red");
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState([225, 50]);
  const [forward, setForward] = useState(true);
  const [rects, setRects] = useState([
    { id: 1, center: [50, 50], size: [50, 50], fillColor: "red" },
    { id: 2, center: [75, 75], size: [50, 50], fillColor: "green" },
    { id: 3, center: [100, 100], size: [50, 50], fillColor: "orange" },
  ]);
  const handleFrame = useCallback(() => {
    const [x, y] = position;
    if (y >= 150) setForward(false);
    if (y <= 50) setForward(true);
    setPosition([x, y + (forward ? 3 : -3)]);
  }, [position, forward]);
  const handleFrame2 = useCallback(() => {
    setRotation(rotation < 360 ? rotation + 3 : 0);
  }, [rotation]);
  return (
    <>
      <Head>
        <title>react-paper-bindings</title>
        <meta name="description" content="react-paper-bindings demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex px-3 h-14 justify-center lg:justify-start border-b border-gray-300">
        <Form.Label title="Canvas 1">
          <Toggle
            className="ml-1"
            checked={visible}
            onChange={() => setVisible(!visible)}
          />
        </Form.Label>
        <Form.Label title="Canvas 2">
          <Toggle
            className="ml-1"
            checked={visible2}
            onChange={() => setVisible2(!visible2)}
          />
        </Form.Label>
        <Form.Label title="Animate">
          <Toggle
            className="ml-1"
            checked={animating}
            onChange={() => setAnimating(!animating)}
          />
        </Form.Label>
      </div>
      <Container className="flex flex-wrap justify-center lg:justify-start">
        {visible && (
          <Canvas
            className="sm:mr-4 my-4 border border-gray-200"
            width={320}
            height={200}
          >
            <View onFrame={animating ? handleFrame : null}>
              <Layer>
                <Rectangle
                  center={position}
                  fillColor={color}
                  size={[50, 50]}
                  onClick={() => setColor(color === "blue" ? "cyan" : "blue")}
                />
                {rects.map((rect) => (
                  <Rectangle
                    {...rect}
                    key={rect.id}
                    onClick={() => setRects(move(rects, 0, 2))}
                  />
                ))}
              </Layer>
            </View>
          </Canvas>
        )}
        {visible2 && (
          <Canvas
            className="sm:mr-4 my-4 border border-gray-200"
            width={320}
            height={200}
          >
            <View onFrame={animating ? handleFrame2 : null}>
              <Layer>
                <CompoundPath selected fillColor="black">
                  <Circle center={[75, 75]} radius={30} />
                  <Circle center={[75, 75]} radius={10} />
                </CompoundPath>
                <Rectangle
                  center={[200, 100]}
                  fillColor={color2}
                  size={[75, 75]}
                  rotation={rotation}
                  onClick={() => setColor2(color2 === "red" ? "gray" : "red")}
                />
              </Layer>
            </View>
          </Canvas>
        )}
      </Container>
    </>
  );
};

export default Examples;
