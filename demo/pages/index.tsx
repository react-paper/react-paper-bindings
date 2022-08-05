import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { Canvas, View, Layer, Rectangle } from "react-paper-renderer";
import styles from "../styles/Styles.module.css";

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

const Home: NextPage = () => {
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [color, setColor] = useState("blue");
  const [color2, setColor2] = useState("purple");
  const [rects, setRects] = useState([
    { id: 1, center: [100, 100], size: [50, 50], fillColor: "red" },
    { id: 2, center: [120, 120], size: [50, 50], fillColor: "green" },
    { id: 3, center: [140, 140], size: [50, 50], fillColor: "orange" },
  ]);
  return (
    <>
      <Head>
        <title>react-paper-renderer</title>
        <meta name="description" content="react-paper-renderer demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/editor">Editor</Link>
      <div className={styles.container}>
        <div>
          <button onClick={() => setVisible(!visible)}>canvas1</button>
          <button onClick={() => setVisible2(!visible2)}>canvas2</button>
        </div>
        {visible && (
          <Canvas className={styles.canvas} width={400} height={300}>
            <View>
              <Layer>
                <Rectangle
                  center={[275, 100]}
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
          <Canvas className={styles.canvas} width={400} height={300}>
            <View>
              <Layer>
                <Rectangle
                  center={[200, 150]}
                  fillColor={color2}
                  size={[100, 100]}
                  onClick={() =>
                    setColor2(color2 === "purple" ? "teal" : "purple")
                  }
                />
              </Layer>
            </View>
          </Canvas>
        )}
      </div>
    </>
  );
};

export default Home;
