import { VariantProps, cva } from "class-variance-authority";
import { AnimationDefinition, motion, useAnimation } from "framer-motion";
import { forwardRef } from "react";
import { Button as Btn, ButtonProps } from "react-aria-components";
import { cn } from "../utilities/cn";
import Spinner from "./Spinner";

const variants = {
  variant: {
    primary: "btn-primary",
    secondary: "btn-secondary",
    unstyled: "btn-unstyled",
  },
};

const defaultVariants =
  "disable-highlight relative touch-none select-none overflow-hidden rounded-xl bg-skin-btn-bg px-7 py-3 text-sm font-medium text-skin-btn-text outline-none ring-skin-btn-ring ring-offset-2 ring-offset-inherit hover:bg-skin-btn-bg-hover focus:outline-none disabled:bg-skin-btn-disabled data-[pressed]:bg-skin-btn-active data-[focus-visible]:ring-2 md:px-5 md:py-2.5";

const ButtonVariants = cva(defaultVariants, {
  variants,
  defaultVariants: {
    variant: "primary",
  },
});

interface IButton extends ButtonProps, VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      children,
      className,
      variant,
      onClick,
      isLoading = false,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const control = useAnimation();

    const enterAnimation: AnimationDefinition = {
      scale: 0.98,
    };

    const leaveAnimation: AnimationDefinition = {
      scale: 1,
      transition: { duration: 0.4 },
    };

    const MotionButton = motion(Btn);

    return (
      <MotionButton
        ref={ref}
        animate={control}
        onPress={onClick}
        onPressStart={() => {
          if (!isLoading) {
            control.stop();
            control.start(enterAnimation);
          }
        }}
        onPressEnd={() => {
          if (!isLoading) {
            control.start(leaveAnimation);
          }
        }}
        className={cn(ButtonVariants({ variant, className }))}
        isDisabled={isLoading || disabled}
        {...rest}
      >
        <div
          className={`flex h-full w-full items-center justify-center ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {children}
        </div>

        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center text-skin-btn-spinner">
            <Spinner size={"sm"} />
          </div>
        )}
      </MotionButton>
    );
  },
);

export { Button, ButtonVariants };
