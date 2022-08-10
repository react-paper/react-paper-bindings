import React from 'react';
import type { NextPage } from 'next';
import { Paper } from 'components/paper';

const Editor: NextPage = () => {
  return <Paper image={data} />;
};

export default Editor;

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const data = {
  id: '37ag863f-8530-4716-512d-5jr2bd3be5d2',
  width: 1920,
  height: 870,
  url: `${prefix}/mr-bubbles.jpg`,
  routes: [
    {
      id: '47dea029-5470-4c5a-a94a-61967cc46854',
      name: 'Route 1',
      type: 'Layer',
      items: [
        {
          id: '54bf866f-3990-4716-801c-3fc7f93bd0c7',
          type: 'Path',
          pathData:
            'M250.1758,639.50879c20.94297,-48.86693 59.34607,-87.4377 93.31954,-127.07342c19.40907,-22.64392 33.63846,-49.15867 53.6091,-71.4788c16.35186,-18.27561 38.25883,-32.30227 55.59462,-49.63806c20.02213,-20.02213 37.52521,-42.18195 55.59462,-63.53671c15.79546,-18.66736 36.73709,-31.77493 51.62358,-51.62358c13.87974,-18.50632 20.68251,-41.9993 35.7394,-59.56567c17.26294,-20.1401 33.62818,-42.14831 47.65253,-65.52223',
          strokeColor: '#ff0000',
          strokeWidth: 3,
          strokeScaling: false,
        },
        {
          id: 'b1b74b5d-20be-4951-a7db-e5f75cf14489',
          type: 'Path',
          pathData:
            'M822.0062,558.10238c12.35201,-22.64536 28.12091,-44.93866 39.71044,-67.50776c23.44243,-45.65105 38.49571,-97.23204 57.58014,-144.94312c20.2652,-50.66299 51.05793,-98.14482 75.44984,-146.92865',
          strokeColor: '#ff0000',
          strokeWidth: 3,
          strokeScaling: false,
        },
        {
          id: '1be38c6b-a37b-4437-9a04-2757b51f122b',
          type: 'Path',
          pathData:
            'M1064.23992,595.8273c24.35736,-36.53603 48.37271,-73.35856 73.46432,-109.20372c22.81339,-32.59056 56.59328,-56.60506 69.49328,-95.30507c9.91559,-29.74678 0.41998,-97.78745 -1.98552,-129.05895c-1.29475,-16.83179 1.98552,-32.98497 1.98552,-49.63806',
          strokeColor: '#ff0000',
          strokeWidth: 3,
          strokeScaling: false,
        },
      ],
    },
    {
      id: '8a0c22ee-16c8-4354-89c2-27bee9149ad4',
      name: 'Route 2',
      type: 'Layer',
      items: [],
    },
  ],
};
