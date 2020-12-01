import SvgIcon from './icon.vue';

const iconSymbol = 'svgIcon';
SvgIcon.name = iconSymbol;

// use object to export
const JYSvgIconPlug = {
  install: function (Vue, opts = { name: iconSymbol, svgRequire: '' }) {
    // SvgIcon.name = opts.name;
    Vue.component(opts.name, SvgIcon);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(iconSymbol, SvgIcon);
}

export { SvgIcon, iconSymbol };

export default JYSvgIconPlug;
