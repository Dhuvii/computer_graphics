import * as Selector from "@radix-ui/react-select";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { forwardRef, useEffect, useId, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useController,
} from "react-hook-form";

interface ISelect {
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  placeholder: string;
  control?: any;
  children: React.ReactNode;
  error?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  TopRightContainer?: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >;
}
const Select = forwardRef<HTMLButtonElement, ISelect>(
  (
    {
      control,
      value,
      name = "",
      onChange,
      children,
      error,
      placeholder,
      Icon,
      required = false,
      TopRightContainer,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const inputAnimation = useAnimationControls();
    const errorText = useAnimationControls();
    useEffect(() => {
      if (error) {
        inputAnimation.start({
          x: [-2, 0, 2, 0, -2],
          transition: { repeat: 5, duration: 0.15 },
        });

        errorText.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        });
      }
    }, [error]);

    let field: ControllerRenderProps<FieldValues, string> | null = null;

    if (control) {
      const controller = useController({
        name,
        control,
      });

      field = controller.field;
    }

    const [internalValue, setInternalValue] = useState(
      (field && field?.value) || value,
    );

    return (
      <div className="relative flex flex-col justify-start">
        <motion.div
          animate={inputAnimation}
          initial={{ x: 0 }}
          className="relative"
        >
          {/* top right container */}
          {TopRightContainer && (
            <div className="absolute -top-[30%] right-2 z-10">
              <TopRightContainer />
            </div>
          )}
          {/* end of top right container */}

          <Selector.Root
            key={internalValue}
            value={internalValue}
            onValueChange={(e) => {
              setInternalValue(e);
              field?.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
            {...rest}
          >
            <motion.div
              animate={inputAnimation}
              initial={{ x: 0 }}
              className="relative"
            >
              <Selector.Trigger
                ref={ref}
                id={id}
                className={`flex w-full flex-shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-xl border-2 p-3 text-sm text-gray-800 outline-none transition duration-300  focus:outline-none focus:ring-2 data-[placeholder]:text-gray-400 
                            ${
                              error
                                ? "border-red-500 focus:border-transparent focus:ring-red-600"
                                : "border-gray-300 focus:border-transparent focus:ring-blue-600"
                            }
                            `}
                {...rest}
              >
                <Selector.Value
                  placeholder={`Select a ${placeholder}`}
                ></Selector.Value>
                <Selector.Icon>
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Selector.Icon>
              </Selector.Trigger>
            </motion.div>

            <Selector.Portal className="z-50">
              <Selector.Content className="rounded-xl border bg-white p-1 shadow-md">
                <Selector.ScrollUpButton className="flex w-full items-center justify-center p-1">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M11.512 8.43a.75.75 0 0 1 .976 0l7 6a.75.75 0 1 1-.976 1.14L12 9.987l-6.512 5.581a.75.75 0 1 1-.976-1.138l7-6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Selector.ScrollUpButton>

                <Selector.Viewport>{children}</Selector.Viewport>
                <Selector.ScrollDownButton className="flex w-full items-center justify-center p-1">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Selector.ScrollDownButton>
                <Selector.Arrow />
              </Selector.Content>
            </Selector.Portal>
          </Selector.Root>

          <motion.label
            htmlFor={id}
            className={`absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm  duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 
            ${
              error
                ? "text-red-600 peer-focus:text-red-600"
                : "text-gray-500 peer-focus:text-blue-600"
            }
            `}
          >
            <div className="flex items-center justify-start gap-2">
              <AnimatePresence>
                {error && (
                  <motion.div
                    layoutId={`error_icon_${id}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={errorText}
                    exit={{ opacity: 0, scale: 0 }}
                    className="rounded-full bg-red-100 p-1"
                  >
                    <svg className="h-4 w-4 text-red-600" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2c.811 0 1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991v-1.574Zm9-3.167a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75ZM12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                )}

                {!error && Icon && (
                  <motion.div layoutId={`custom_icon_${id}`}>
                    <Icon />
                  </motion.div>
                )}
                <motion.span layoutId={`label_${id}`}>
                  {placeholder}
                  {required && (
                    <span>
                      <sup className="text-sm">*</sup>
                    </span>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.label>
        </motion.div>

        {/* error text */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={errorText}
              className="absolute inset-x-0 -bottom-5"
            >
              <p className="w-full text-left text-xs text-red-600">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* end of error text */}
      </div>
    );
  },
);

interface IOption {
  value: string;
  children: React.ReactNode;
}

const Option = forwardRef<HTMLDivElement, IOption>(
  ({ value, children, ...rest }, ref) => (
    <Selector.Item
      ref={ref}
      value={value}
      className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-800 outline-none data-[highlighted]:bg-blue-600 data-[highlighted]:text-white"
      {...rest}
    >
      <div className="flex items-center justify-between gap-2">
        <Selector.ItemText className="">{children}</Selector.ItemText>
        <Selector.ItemIndicator>
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            >
              <path strokeLinejoin="round" d="m8.5 12.5l2 2l5-5" />
              <path d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
            </g>
          </svg>
        </Selector.ItemIndicator>
      </div>
    </Selector.Item>
  ),
);

export { Option, Select };
