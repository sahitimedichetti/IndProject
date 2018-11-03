import { Component, OnInit, AfterViewInit } from '@angular/core';
//import * as Plotly from 'plotly.js';
import * as Plotlyjs from 'plotly.js/dist/plotly';
import { neoCortexUtils } from '../neocortexutils';
import { color } from 'd3';
import { environment as env } from "../environments/environment";

@Component({
  selector: 'app-ainet',
  templateUrl: './ainet.component.html',
  styleUrls: ['./ainet.component.css']
})
export class AinetComponent implements OnInit, AfterViewInit {

  weightGivenByUser: string;

  constructor() {

  }
  ngOnInit() {
  }
  ngAfterViewInit() {

    this.createChart();
  }
  
  createChart() {
    let getCoordinates = this.fillChart();
    let xCoordinates = getCoordinates[0];
    let yCoordinates = getCoordinates[1];
    let zCoordinates = getCoordinates[2];
    console.log(xCoordinates, "X");
    console.log(yCoordinates, "Y");
    console.log(zCoordinates, "Z");

    let colourArray = this.getHeatColor();
    let cellColours = colourArray[0];
    let weights = colourArray[1];

    const neurons = {
      x: xCoordinates,
      y: yCoordinates,
      z: zCoordinates,
      text: weights,
      name: 'Neuron',
      mode: 'markers',

      //connectgaps: true,
      /*  visible: true,
       legendgroup: true, */
      /* line: {
        width: 4,
        colorscale: 'Viridis',
        color: '#7CFC00'
      }, */
      marker: {
        opacity: env.opacityOfNeuron,
        size: env.sizeOfNeuron,
        // color: '#00BFFF',
        color: cellColours,
        symbol: 'circle',
        line: {
          //color: '#7B68EE',
          // width:10
        },

      },
      type: 'scatter3d',
      //scene: "scene1",

    };
    const synapses = {
      //the first point in the array will be joined with a line with the next one in the array ans so on...
      type: 'scatter3d',
      mode: 'lines',
      name: 'Synapse',
      x: xCoordinates,
      y: yCoordinates,
      z: zCoordinates,
      text: weights,
      opacity: env.opacityOfSynapse,
      line: {
        width: env.lineWidthOfSynapse,
        color: cellColours,

        //color: '#7CFC00'
        //colorscale: 'Viridis'
      }
    };

    const neuralChartLayout = {
      //showlegend: false, Thgis option is to show the name of legend/DataSeries 
      scene: {
        aspectmode: "manual",
        aspectratio: {
          x: env.xRatio, y: env.yRatio, z: env.zRatio,
        }
      },

      legend: {
        x: 0.5,
        y: 1
      },
      //width: 1800,
      // height: 800,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 4

      }
    };

    const neuralChartConfig = {
      //displayModeBar: false,
      title: '3DChart',
      displaylogo: false,
      showLink: false,
      // showlegend: false

    };
    /*    const update = {
         opacity: 0.8,
         marker:{
           color: 'red',
           size: 25
         },
         x: [[41.5]],
         y: [[0.5]],
         z: [[3.5]]
       }; */
    let graphDOM = this.makeChartResponsive();

    Plotlyjs.newPlot(graphDOM, [neurons, synapses], neuralChartLayout, neuralChartConfig);
    // Plotlyjs.newPlot(graphDOM, [test1, test2]);
    //Plotlyjs.restyle(gd,  update, [0]);

    // this function gives the selected neurons by weight 
    this.showNeuronsByWeightSmaller = function () {

      let filteredXCoordinates = [];
      let filteredYCoordinates = [];
      let filteredZCoordinates = [];
      let selectedWeights = [];
      let selectedColours = [];

      let neuronWeight = parseFloat(this.weightGivenByUser);

      if (neuronWeight > 1) {
        throw "Weight can't be greater than 1";
      }

      let heatColourArray = this.getHeatColor();
      let weights = heatColourArray[1];
      let cellColours = heatColourArray[0];
      let indexOfNeuron = weights.indexOf(neuronWeight);
      console.log(indexOfNeuron, neuronWeight);

      if (indexOfNeuron == -1) {
        throw "Given weight is not present"
      }

      filteredXCoordinates = xCoordinates.slice(0, indexOfNeuron);
      filteredYCoordinates = yCoordinates.slice(0, indexOfNeuron);
      filteredZCoordinates = zCoordinates.slice(0, indexOfNeuron);
      selectedWeights = weights.slice(0, indexOfNeuron);
      selectedColours = cellColours.slice(0, indexOfNeuron);


      const updateNeurons = {
        x: filteredXCoordinates,
        y: filteredYCoordinates,
        z: filteredZCoordinates,
        text: selectedWeights,
        name: 'Neuron',
        mode: 'markers',
        marker: {
          opacity: env.opacityOfNeuron,
          size: env.sizeOfNeuron,
          color: selectedColours,
          symbol: 'circle',
        },
        type: 'scatter3d',
      };
      const updateSynapses = {
        //the first point in the array will be joined with a line with the next one in the array ans so on...
        type: 'scatter3d',
        mode: 'lines',
        name: 'Synapse',
        x: filteredXCoordinates,
        y: filteredYCoordinates,
        z: filteredZCoordinates,
        text: selectedWeights,
        opacity: env.opacityOfSynapse,
        line: {
          width: env.lineWidthOfSynapse,
          color: cellColours,
        }
      };
      Plotlyjs.newPlot(graphDOM, [updateNeurons, updateSynapses], neuralChartLayout, neuralChartConfig);
    }

    // this function gives the selected neurons by weight 
    this.showNeuronsByWeightGreater = function () {

      let selectedXCoordinates = [];
      let selectedYCoordinates = [];
      let selectedZCoordinates = [];
      let selectedWeights = [];
      let selectedColours = [];

      let neuronWeight = parseFloat(this.weightGivenByUser);

      if (neuronWeight > 1) {
        throw "Weight can't be greater than 1";
      }

      let heatColourArray = this.getHeatColor();
      let weights = heatColourArray[1];
      let cellColours = heatColourArray[0];
      let indexOfNeuron = weights.indexOf(neuronWeight);
      console.log(indexOfNeuron, neuronWeight);

      if (indexOfNeuron == -1) {
        throw "Given weight is not present"
      }

      selectedXCoordinates = xCoordinates.slice(indexOfNeuron);
      selectedYCoordinates = yCoordinates.slice(indexOfNeuron);
      selectedZCoordinates = zCoordinates.slice(indexOfNeuron);
      selectedWeights = weights.slice(indexOfNeuron);
      selectedColours = cellColours.slice(indexOfNeuron);

      const updateNeurons = {
        x: selectedXCoordinates,
        y: selectedYCoordinates,
        z: selectedZCoordinates,
        text: selectedWeights,
        name: 'Neuron',
        mode: 'markers',
        marker: {
          opacity: env.opacityOfNeuron,
          size: env.sizeOfNeuron,
          color: selectedColours,
          symbol: 'circle',
        },
        type: 'scatter3d',
      };
      const updateSynapses = {
        //the first point in the array will be joined with a line with the next one in the array ans so on...
        type: 'scatter3d',
        mode: 'lines',
        name: 'Synapse',
        x: selectedXCoordinates,
        y: selectedYCoordinates,
        z: selectedZCoordinates,
        text: selectedWeights,
        opacity: env.opacityOfSynapse,
        line: {
          width: env.lineWidthOfSynapse,
          color: selectedColours,
        }
      };
      Plotlyjs.newPlot(graphDOM, [updateNeurons, updateSynapses], neuralChartLayout, neuralChartConfig);

    }


    window.onresize = function () {
      Plotlyjs.Plots.resize(graphDOM);
    };
  }
  makeChartResponsive() {
    let d3 = Plotlyjs.d3;
    let WIDTH_IN_PERCENT_OF_PARENT = 90;
    let HEIGHT_IN_PERCENT_OF_PARENT = 90;
    let gd3 = d3.select('body').append('div').style({
      width: WIDTH_IN_PERCENT_OF_PARENT + '%',
      'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

      height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
      'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
    });
    let graphDOM = gd3.node();
    return graphDOM;

  }
  fillChart() {
    let model = neoCortexUtils.createModel(1, [100, 6], 10); // createModel (numberOfAreas, [xAxis, zAxis], yAxis)
    // this.opacityValues = new Array(areaSection).fill(0.5, 0, 1200).fill(1.8, 1200, 2400);
    //this.colour = new Array(areaSection).fill('#00BFFF', 0, 800).fill('#48afd1', 800, 1600).fill('#236d86', 1600, 2499);
    let xCoord = [];
    let yCoord = [];
    let zCoord = [];
    let numOfAreas = model.areas;
    let ai;
    for (ai = 0; ai < model.areas.length; ai++) {
      for (let i = 0; i < model.areas[ai].minicolumns[0].length; i++) {
        xCoord.push(model.areas[ai].minicolumns[0][i].posX);
        yCoord.push(model.areas[ai].minicolumns[0][i].posY);
        zCoord.push(model.areas[ai].minicolumns[0][i].posZ);
      }
    }

    return [xCoord, yCoord, zCoord, numOfAreas];

  }

  getHeatColor() {

    let colourScheme = [];
    let colourCodingSegment = [];
    let colourCoding = [];
    let weights = [];
    let neuronsWeightSegment = [];
    let allNeuronsWeight = [];

    let getCoordLength = this.fillChart();
    let xCoordLen = getCoordLength[0].length;
    let totalAreas = getCoordLength[3].length;

    /*   for (let neuronWeight = 0; neuronWeight < 1; neuronWeight = neuronWeight + (1 / (xCoordLen / totalAreas)) ) {
        let H = (1.0 - neuronWeight) * 240;
            colourScheme.push("hsl(" + H + ", 100%, 50%)")
      }
      for (let hsl = 0; hsl < (xCoordLen / colourScheme.length); hsl++) {
        for (let colourCode = 0; colourCode < colourScheme.length; colourCode++) {
          colourCoding.push(colourScheme[colourCode]);
  
        }
      } */
    for (let nW = 0; nW < 1; nW = nW + (1 / (env.numberOfColours))) {
      let H = (1.0 - nW) * 240;

      colourScheme = Array((xCoordLen / totalAreas) / (env.numberOfColours)).fill("hsl(" + H + ", 100%, 50%)");
      /* var b = 124.7485;
      var c = b.toFixed(3);
      console.log(parseFloat(c)); */
      let fixedNW = nW.toFixed(3);
      weights = Array((xCoordLen / totalAreas) / (env.numberOfColours)).fill(parseFloat(fixedNW));

      for (let hsl = 0; hsl < (colourScheme.length); hsl++) {
        colourCodingSegment.push(colourScheme[hsl]);

      }

      for (let w = 0; w < (weights.length); w++) {
        neuronsWeightSegment.push(weights[w]);
      }
    }

    for (let i = 0; i < totalAreas; i++) {
      for (let j = 0; j < colourCodingSegment.length; j++) {
        colourCoding.push(colourCodingSegment[j]);
      }

      for (let k = 0; k < totalAreas; k++) {
        for (let l = 0; l < neuronsWeightSegment.length; l++) {
          allNeuronsWeight.push(neuronsWeightSegment[l]);
        }
      }
    }

    return [colourCoding, allNeuronsWeight, colourCodingSegment];
  }

  showNeuronsByWeightGreater() {
  }

  showNeuronsByWeightSmaller() {

  }

}
