import { Fragment, useEffect, useState } from "react";
import genGrid from "../utilities/genGrid";
import dda from "../functions/dda";
import Input from "../components/inputs/Input";
import { Button } from "../components/Button";

const DDA = () => {
  const row = 100;
  const col = 100;
  const [plane, setPlane] = useState(genGrid(row, col));

  const [points, setPoints] = useState({
    p1: { x: 5, y: 4 },
    p2: { x: 10, y: 70 },
  });

  const [values, setValues] = useState<{
    coordinates: number[][];
    dy: number;
    dx: number;
    steps: number;
    x_inc: number;
    y_inc: number;
  }>({
    steps: 0,
    dx: 0,
    dy: 0,
    x_inc: 0,
    y_inc: 0,
    coordinates: [[]],
  });

  const plot = () => {
    setPlane(genGrid(row, col));
    values.coordinates.forEach((coord) => {
      const x = coord[0];
      const y = coord[1];

      setPlane((pv) =>
        pv.map((row, r_i) =>
          row.map((col, c_i) => {
            if (r_i + 1 === y && c_i + 1 === x) {
              return 1;
            }
            return col;
          }),
        ),
      );
    });
  };

  useEffect(() => {
    setValues(dda(points));
    plot();
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col-reverse items-start justify-between gap-10 p-10 xl:flex-row">
      {/* grid */}
      <div className="aspect-square w-full flex-shrink-0 xl:w-[700px]">
        <div
          style={{
            gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${row}, minmax(0, 1fr))`,
          }}
          className="grid h-full w-full items-center justify-center divide-x divide-y divide-gray-800 border-b border-r border-gray-800 "
        >
          {plane.map((row, r_i) => {
            return row.map((c, c_i) => (
              <div
                key={`${r_i}_${c_i}_${row}`}
                className={`${
                  r_i === 0 && c_i === 0 && "border-l border-t border-gray-800"
                } ${
                  c === 1 ? "bg-gray-800" : "bg-transparent"
                } flex aspect-square h-full w-full items-center justify-center divide-x text-xs text-gray-800`}
              >
                {/* ({r_i + 1},{c_i + 1}) */}
              </div>
            ));
          })}
        </div>
      </div>
      {/* grid */}

      <div className="w-full">
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            setValues(dda(points));
            plot();
          }}
        >
          <h1 className="text-3xl font-medium text-gray-800">DDA Algorithm</h1>
          <p className="text-sm text-gray-600">Digital Differential Analyzer</p>
          <div className="mt-5 flex w-full flex-col gap-5 md:flex-row">
            <div className="w-full">
              <h3 className="text-sm font-medium text-gray-800">Point 1</h3>
              <div className="mt-2 flex gap-3">
                <Input
                  placeholder="x"
                  type="number"
                  min={0}
                  max={100}
                  value={points.p1.x}
                  onChange={(e) =>
                    setPoints((pv) => {
                      const obj = { ...pv };
                      obj.p1.x = parseInt(e.target.value);
                      return obj;
                    })
                  }
                />
                <Input
                  placeholder="y"
                  type="number"
                  min={0}
                  max={100}
                  value={points.p1.y}
                  onChange={(e) =>
                    setPoints((pv) => {
                      const obj = { ...pv };
                      obj.p1.y = parseInt(e.target.value);
                      return obj;
                    })
                  }
                />
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-sm font-medium text-gray-800">Point 2</h3>
              <div className="mt-2 flex gap-3">
                <Input
                  placeholder="x"
                  type="number"
                  min={0}
                  max={100}
                  value={points.p2.x}
                  onChange={(e) =>
                    setPoints((pv) => {
                      const obj = { ...pv };
                      obj.p2.x = parseInt(e.target.value);
                      return obj;
                    })
                  }
                />
                <Input
                  placeholder="y"
                  type="number"
                  min={0}
                  max={100}
                  value={points.p2.y}
                  onChange={(e) =>
                    setPoints((pv) => {
                      const obj = { ...pv };
                      obj.p2.y = parseInt(e.target.value);
                      return obj;
                    })
                  }
                />
              </div>
            </div>
          </div>

          <Button
            className="mt-5 w-full"
            onClick={() => {}}
            type="submit"
            variant={"primary"}
          >
            Plot
          </Button>
        </form>

        {values.coordinates && values.coordinates.length > 0 && (
          <>
            <div className="mt-10 flex w-full flex-wrap items-center justify-between gap-10 border-t pt-5">
              <div className="">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  dx
                </p>
                <h3 className="text-3xl font-medium text-gray-800">
                  {values.dx}
                </h3>
              </div>

              <div className="">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  dy
                </p>
                <h3 className="text-3xl font-medium text-gray-800">
                  {values.dy}
                </h3>
              </div>

              <div className="">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  steps
                </p>
                <h3 className="text-3xl font-medium text-gray-800">
                  {values.steps}
                </h3>
              </div>

              <div className="">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  x inc
                </p>
                <h3 className="text-3xl font-medium text-gray-800">
                  {values.x_inc.toFixed(2)}
                </h3>
              </div>

              <div className="">
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  y inc
                </p>
                <h3 className="text-3xl font-medium text-gray-800">
                  {values.y_inc.toFixed(2)}
                </h3>
              </div>
            </div>

            <div className="mt-5 grid w-full grid-cols-2 gap-1">
              <div className="flex items-center justify-center rounded-lg bg-gray-300 p-1 text-gray-800">
                x
              </div>
              <div className="flex items-center justify-center rounded-lg bg-gray-300 p-1 text-gray-800">
                y
              </div>
              <div className="col-span-2 mt-2 grid max-h-80 w-full grid-cols-2 gap-1 overflow-y-auto">
                {values.coordinates.map((coord) => (
                  <Fragment key={`${coord[0]}_${coord[1]}`}>
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-800">
                      {coord[0]}
                    </div>
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-800">
                      {coord[1]}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default DDA;
