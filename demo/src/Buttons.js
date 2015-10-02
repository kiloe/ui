import React from 'react';
import View from '../../package/View';

import ButtonView from '../../package/ButtonView';
import IconView from '../../package/IconView';
import IconButtonView from '../../package/IconButtonView';
import AddIcon from '../../package/icons/AddIcon';
import FormatPaintIcon from '../../package/icons/FormatPaintIcon';
import CloudIcon from '../../package/icons/CloudIcon';


export default class ButtonsDemo extends React.Component {

  static styles = {
    ...View.styles,
    ...ButtonView.styles,
    ...IconButtonView.styles,
    ...IconView.styles,
  }


  render(){

    let demo = { row:true, style:{padding:10, justifyContent:'space-between'} };

    return (
      <View scroll>
        <View raised>
          <View row>
            <h2>Flat Buttons</h2>
          </View>
          <View {...demo}>
            <ButtonView label="Flat Normal"/>
            <ButtonView disabled label="Flat Disabled"/>

            <ButtonView primary label="Flat Primary"/>
            <ButtonView primary disabled label="Flat Primary Disabled"/>

            <ButtonView accent label="Flat Accent"/>
            <ButtonView accent disabled label="Flat Accent Disabled"/>

          </View>
          <View row>
            <h2>Raised Buttons</h2>
          </View>
          <View {...demo}>
            <ButtonView raised label="Raised Normal"/>
            <ButtonView raised disabled label="Raised Disabled"/>

            <ButtonView raised primary label="Raised Primary"/>
            <ButtonView raised primary disabled label="Raised Primary Disabled"/>

            <ButtonView raised accent label="Raised Accent"/>
            <ButtonView raised accent disabled label="Raised Accent Disabled"/>

          </View>
        </View>
        <View row>
          <h2>Intrinsic sized buttons</h2>
        </View>
        <View {...demo}>
          <ButtonView disabled label="Disabled"/>
          <ButtonView label="Flat"/>
          <ButtonView raised label="Raised"/>
          <ButtonView raised primary invert label="Raised Invert"/>
          <ButtonView raised primary label="Raised Primary" />
        </View>
        <View row>
          <h2>Intrinsic size scaled up buttons</h2>
        </View>
        <View {...demo} scale={2}>
          <ButtonView disabled label="Disabled"/>
          <ButtonView label="Flat"/>
          <ButtonView raised label="Raised"/>
          <ButtonView raised accent invert label="Raised Invert"/>
          <ButtonView raised accent label="Raised Accent" />
        </View>
        <View row>
          <h2>Intrinsic sized icon buttons</h2>
        </View>
        <View {...demo}>
          <ButtonView disabled label="Disabled" icon={<FormatPaintIcon/>}/>
          <ButtonView label="Flat" icon={<FormatPaintIcon/>}/>
          <ButtonView raised label="Raised" icon={<FormatPaintIcon/>}/>
          <ButtonView raised primary invert label="Raised Invert" icon={<FormatPaintIcon/>}/>
          <ButtonView raised primary label="Raised Primary" icon={<FormatPaintIcon/>}/>
        </View>
        <View row>
          <h2>Fab Buttons</h2>
        </View>
        <View {...demo} size={6} scale={6}>
          <ButtonView fab disabled icon={<AddIcon/>} />
          <ButtonView fab icon={<AddIcon/>} />
          <ButtonView fab raised icon={<AddIcon/>} label="This should not show" />
          <ButtonView fab raised accent icon={<AddIcon/>} />
          <ButtonView fab raised primary icon={<AddIcon/>} />
        </View>
        <View row>
          <h2>Mini Fab Buttons</h2>
        </View>
        <View {...demo} size={6} scale={6}>
          <ButtonView fab mini disabled icon={<AddIcon/>} />
          <ButtonView fab mini icon={<AddIcon/>} />
          <ButtonView fab mini raised icon={<AddIcon/>} label="This should not show" />
          <ButtonView fab mini raised accent icon={<AddIcon/>} />
          <ButtonView fab mini raised primary icon={<AddIcon/>} />
        </View>
        <View row>
          <h2>Fill Buttons</h2>
        </View>
        <View {...demo}>
          <ButtonView accent invert size='fill' label="button" align="left" />
          <ButtonView accent invert size='fill' label="button" align="center" />
          <ButtonView accent invert size='fill' label="button" align="right" />
        </View>
        <View {...demo}>
          <ButtonView primary size='fill' label="button" align="left" />
          <ButtonView primary size='fill' label="button" align="center" />
          <ButtonView primary size='fill' label="button" align="right" />
        </View>
        <View {...demo}>
          <ButtonView raised size='fill' label="button" align="left" />
          <ButtonView raised size='fill' label="button" align="center" />
          <ButtonView raised size='fill' label="button" align="right" />
        </View>
        <View row>
          <h2>Buttons only with icons</h2>
        </View>
        <View {...demo} scale={2}>
          <ButtonView disabled icon={<CloudIcon/>}/>
          <ButtonView icon={<CloudIcon/>}/>
          <ButtonView raised icon={<CloudIcon/>}/>
          <ButtonView raised accent icon={<CloudIcon/>}/>
          <ButtonView raised primary icon={<CloudIcon/>}/>
        </View>
        <View row>
          <h2>Buttons only with icons (inverted)</h2>
        </View>
        <View {...demo} scale={2}>
          <ButtonView invert disabled icon={<CloudIcon/>}/>
          <ButtonView invert icon={<CloudIcon/>}/>
          <ButtonView invert raised icon={<CloudIcon/>}/>
          <ButtonView invert raised accent icon={<CloudIcon/>}/>
          <ButtonView invert raised primary icon={<CloudIcon/>}/>
        </View>
        <View row>
          <h2>IconButtons</h2>
        </View>
        <View {...demo}>
          <IconButtonView disabled icon={<CloudIcon/>}/>
          <IconButtonView icon={<CloudIcon/>}/>
          <IconButtonView raised icon={<CloudIcon/>}/>
          <IconButtonView accent icon={<CloudIcon/>}/>
          <IconButtonView primary icon={<CloudIcon/>}/>
        </View>
        <View row>
          <h2>IconButtons (inverted)</h2>
        </View>
        <View {...demo}>
          <IconButtonView invert disabled icon={<CloudIcon/>}/>
          <IconButtonView invert icon={<CloudIcon/>}/>
          <IconButtonView invert raised icon={<CloudIcon/>}/>
          <IconButtonView invert accent icon={<CloudIcon/>}/>
          <IconButtonView invert primary icon={<CloudIcon/>}/>
        </View>
        <View row>
          <View>
            <View row>
              <h2>Align left</h2>
            </View>
            <View {...demo} row={false}>
              <ButtonView align="left" disabled label="Disabled" icon={<CloudIcon/>}/>
              <ButtonView align="left" label="Flat" icon={<CloudIcon/>}/>
              <ButtonView align="left" raised label="Raised" icon={<CloudIcon/>}/>
              <ButtonView align="left" raised accent label="Accent" icon={<CloudIcon/>}/>
              <ButtonView align="left" raised primary label="Primary" icon={<CloudIcon/>}/>
            </View>
          </View>
          <View>
            <View row>
              <h2>Align Center</h2>
            </View>
            <View {...demo} row={false}>
              <ButtonView align="center" disabled label="Disabled" icon={<CloudIcon/>}/>
              <ButtonView align="center" label="Flat" icon={<CloudIcon/>}/>
              <ButtonView align="center" raised label="Raised" icon={<CloudIcon/>}/>
              <ButtonView align="center" raised accent label="Accent" icon={<CloudIcon/>}/>
              <ButtonView align="center" raised primary label="Primary" icon={<CloudIcon/>}/>
            </View>
          </View>
          <View>
            <View row>
              <h2>Align right</h2>
            </View>
            <View {...demo} raised row={false}>
              <ButtonView align="right" disabled label="Disabled" icon={<CloudIcon/>}/>
              <ButtonView align="right" label="Flat" icon={<CloudIcon/>}/>
              <ButtonView align="right" raised label="Raised" icon={<CloudIcon/>}/>
              <ButtonView align="right" raised accent label="Accent" icon={<CloudIcon/>}/>
              <ButtonView align="right" raised primary label="Primary" icon={<CloudIcon/>}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

