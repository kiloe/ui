import React from 'react';
import View from '../../package/View';
import UI from '../../package/index';

UI.registerCSS({
  '.color-wheel': {
  },
  '.color-wheel .selector': {
    opacity: 0,
    fill: '#BDBDBD',
  },
  '.color-wheel .label':{
    opacity: 0,
    textAnchor: 'middle',
    fill: '#fff',
    fontSize: '2rem',
    translation: 'opacity .4s cubic-bezier(.4,0,1,1)',
  },
  '.color-wheel .currentPrimary .selector': {
    opacity: 1,
  },
  '.color-wheel .currentPrimary .label1': {
    opacity: 1,
  },
  '.color-wheel .currentAccent .selector': {
    opacity: 1,
  },
  '.color-wheel .currentAccent .label2': {
    opacity: 1,
  },
});

export default class ColorWheel extends View {

  constructor(...args){
    super(...args);
    this.state = {
      pickingPrimary: true,
    };
  }

  pick(name, accentHue){
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('picked', name, accentHue);
      if( this.state.pickingPrimary ){
        this.onPickPrimary(name);
      } else {
        this.onPickAccent(name, accentHue);
      }
      this.setState({
        pickingPrimary: !this.state.pickingPrimary
      });

    };
  }

  onPickPrimary(name){
    if( this.props.onPickPrimary ){
      this.props.onPickPrimary(name);
    }
  }

  onPickAccent(name, hue){
    if( this.props.onPickAccent ){
      this.props.onPickAccent(name, hue);
    }
  }

  getBestAccentHue(name, pal){
    let isHueLight = UI.ThemeManager.prototype.isHueLight;
    return ['A400','A700','800','900']
      .filter(hue => !isHueLight(name, hue))
      .filter(hue => pal[hue])[0];
  }

  segment(palettes, name, i){
    let pal = palettes[name];
    let rgbPrimary = pal['500'].join(',');
    let accentHue = this.getBestAccentHue(name, pal);
    let rgbAccent = pal[accentHue].join(',');
    let angle = 18.94736842105263 * i;
    let cls =
      name == UI.theme.primaryPalette ? 'currentPrimary' :
      name == UI.theme.accentPalette ? 'currentAccent' :
      '';
    return (
      <g key={name} className={cls} data-color={name} transform={`rotate(${angle})`} onClick={this.pick(name,accentHue)}>
        <g className="polygons" filter="">
          <polygon points="32.94244769737761,-94.41819284282845 82.35611924344403,-236.0454821070711 0,-250 0,-140" style={{fill: `rgb(${rgbPrimary})`}}></polygon>
          <polygon points="32.94244769737761,-94.41819284282845 46.11942677632865,-132.1854699799598 0,-140 0,-100" style={{fill: `rgb(${rgbAccent})`}}></polygon>
        </g>
        <path className="selector" d=" M 40.58743365058543 -243.2271552125793 L 24.852895361930592 -273.4550707222589 A 23.866215590706414 23.866215590706414 18.94736842105263 1 1 65.28441937535095 -266.70824265179726 z "></path>
        <g transform="translate(47.0814230346791,-282.143500046592)">
          <text className="label label1" transform={`rotate(-${angle})`} dy="0.5ex">1</text>
        </g>
        <g transform="translate(47.0814230346791,-282.143500046592)">
          <text className="label label2" transform={`rotate(-${angle})`} dy="0.5ex">2</text>
        </g>
      </g>
    );
  }

  segments(){
    let t = new UI.ThemeManager({});
    let palettes = t.getAllPalettes();
    return Object.keys(palettes)
      .map(this.segment.bind(this, palettes));
  }

  render(){
    return super.render(
      <div className="color-wheel">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXink="http://www.w3.org/1999/xlink" viewBox="0 0 650 650" preserveAspectRatio="xMidYMid meet" width="350" height="350">
          <defs>
            <filter id="drop-shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3.2"></feGaussianBlur>
              <feOffset dx="0" dy="0" result="offsetblur"></feOffset>
              <feFlood flood-color="rgba(0,0,0,1)"></feFlood>
              <feComposite in2="offsetblur" operator="in"></feComposite>
              <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>
          </defs>
          <g className="wheel--maing" transform="translate(325,325)">
            {this.segments()}
          </g>
        </svg>
      </div>
    );
  }

}
