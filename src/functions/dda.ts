export default ({
  p1,
  p2,
}: {
  p1: { x: number; y: number };
  p2: { x: number; y: number };
}) => {
  const coordinates = [];

  const dx = Math.abs(p2.x - p1.x);
  const dy = Math.abs(p2.y - p1.y);

  let steps = dy > dx ? dy : dx;
  let x_inc = dx / steps;
  let y_inc = dy / steps;

  let x = p1.x;
  let y = p1.y;

  for (let i = 0; i <= steps; i++) {
    coordinates.push([Math.round(x), Math.round(y)]);
    x = x + x_inc;
    y = y + y_inc;
  }

  return { coordinates, dy, dx, steps, x_inc, y_inc };
};
