import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { Container, Title, Code } from "components/content";

const code = {
  install: `npm install react-paper-renderer`,
  usage: `import { Canvas, View, Layer, Rectangle } from 'react-paper-bindings'

const MyCanvas = () =>(
  <Canvas width={800} height={600}>
    <View>
      <Layer>
        <Rectangle
          center={[200, 200]}
          size={[100, 100]}
          fillColor={'red'}
          onClick={() => console.log('click')}
        />
      </Layer>
    </View>
  </Canvas>
)

export default MyCanvas`,
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>react-paper-bindings</title>
        <meta name="description" content="react-paper-bindings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="pb-10">
        <Title>Installation</Title>
        <Code text={code.install} language="bash" />
        <Title>Usage</Title>
        <Code text={code.usage} language="jsx" />
      </Container>
    </>
  );
};

export default Home;
