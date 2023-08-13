export default ({
  p1,
  p2,
}: {
  p1: { x: number; y: number };
  p2: { x: number; y: number };
}) => {
  const coordinates = [];
  let x_end = 0;
  const dx = Math.abs(p2.x - p1.x);
  const dy = Math.abs(p2.y - p1.y);

  let x: number;
  let y: number;

  if (p1.x > p2.x) {
    x = p2.x;
    y = p2.y;
    x_end = p1.x;
  } else {
    x = p1.x;
    y = p1.y;
    x_end = p2.x;
  }

  let p = 2 * dy - dx;
  let inc_1 = 2 * dy;
  let inc_2 = 2 * dy - 2 * dx;
  coordinates.push([x, y]);

  while (x < x_end + 1) {
    if (p < 0) {
      p = p + inc_1;
    } else {
      p = p + inc_2;
      y++;
    }
    coordinates.push([x, y]);
    x++;
  }

  return { coordinates, dy, dx, x_end };
};
