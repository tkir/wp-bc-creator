import {getMax, getMin, getMaxSize, getMaxPosition} from './size.util';

describe('getMax', () => {
  const bg = {width: 90, height: 50, indent: 5};
  const element: HTMLElement = document.createElement('div');
  element.style.height = '30px';
  element.style.width = '25px';

  it('return max element position of Line', ()=>{
    expect(getMax('Line', element, bg))
      .toEqual({
        x: bg.width - parseInt(getComputedStyle(element).width),
        y: bg.height - parseInt(getComputedStyle(element).height)
      });
  });

  it('return max element position of Line', ()=>{
    expect(getMax('Logo', element, bg))
      .toEqual({
        x: bg.width - bg.indent - parseInt(getComputedStyle(element).width),
        y: bg.height - bg.indent - parseInt(getComputedStyle(element).height)
      });
    expect(getMax('Icon', element, bg))
      .toEqual({
        x: bg.width - bg.indent - parseInt(getComputedStyle(element).width),
        y: bg.height - bg.indent - parseInt(getComputedStyle(element).height)
      });
    expect(getMax('Text', element, bg))
      .toEqual({
        x: bg.width - bg.indent - parseInt(getComputedStyle(element).width),
        y: bg.height - bg.indent - parseInt(getComputedStyle(element).height)
      });
    expect(getMax('default', element, bg))
      .toEqual({
        x: bg.width - bg.indent - parseInt(getComputedStyle(element).width),
        y: bg.height - bg.indent - parseInt(getComputedStyle(element).height)
      });
  });
});

describe('getMin', () => {
  const bg = {width: 90, height: 50, indent: 5};

  it('return 0;0 if Line', () => {
    const res = getMin('Line', null, bg);
    expect(res).toEqual({x: 0, y: 0});
  });

  it('return indent if Logo, Icon, Text', () => {
    let res = getMin('Logo', null, bg);
    expect(res).toEqual({x: bg.indent, y: bg.indent});

    res = getMin('Icon', null, bg);
    expect(res).toEqual({x: bg.indent, y: bg.indent});

    res = getMin('Text', null, bg);
    expect(res).toEqual({x: bg.indent, y: bg.indent});
  });
});

describe('getMaxSize', () => {
  const bg = {width: 90, height: 50, indent: 5};

  it('return size if Line', () => {
    expect(getMaxSize('Line', bg))
      .toEqual({x: bg.width, y: bg.height});
  });

  it('return size-indent if Logo, Icon, default', () => {
    expect(getMaxSize('Logo', bg))
      .toEqual({x: bg.width - bg.indent, y: bg.height - bg.indent});
    expect(getMaxSize('Icon', bg))
      .toEqual({x: bg.width - bg.indent, y: bg.height - bg.indent});
    expect(getMaxSize('default', bg))
      .toEqual({x: bg.width - bg.indent, y: bg.height - bg.indent});
  })
});

describe('getMaxPosition', () => {
  const el = {width: 4, height: 5};
  const bg = {width: 90, height: 50, indent: 5};

  it('return size if Line', () => {
    expect(getMaxPosition('Line', el, bg))
      .toEqual({x: bg.width - el.width, y: bg.height - el.height});
  });

  it('return size-indent if Logo, Icon, default', () => {
    expect(getMaxPosition('Logo', el, bg))
      .toEqual({x: bg.width - bg.indent - el.width, y: bg.height - bg.indent - el.height});
    expect(getMaxPosition('Text', el, bg))
      .toEqual({x: bg.width - bg.indent - el.width, y: bg.height - bg.indent - el.height});
    expect(getMaxPosition('Icon', el, bg))
      .toEqual({x: bg.width - bg.indent - el.width, y: bg.height - bg.indent - el.height});
    expect(getMaxPosition('default', el, bg))
      .toEqual({x: bg.width - bg.indent - el.width, y: bg.height - bg.indent - el.height});
  });
});
