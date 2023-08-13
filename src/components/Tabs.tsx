import { motion } from "framer-motion";
import { forwardRef, useEffect, useId } from "react";
import { Button } from "./Button";

interface ITabs {
  tabs: string[];
  onChange?: (tab: string) => void;
  selectedTab: string;
}
const Tabs = forwardRef<HTMLButtonElement, ITabs>(
  ({ tabs, onChange, selectedTab }, ref) => {
    const id = useId();

    useEffect(() => {
      onChange && onChange(selectedTab);
    }, []);

    return (
      <div className="spaxe-x-1 flex">
        {tabs.map((t, i) => (
          <div key={t + i}>
            <Button
              ref={ref}
              variant={"unstyled"}
              className={`relative overflow-visible rounded-full bg-transparent text-white hover:bg-transparent focus-visible:ring-gray-600 data-[pressed]:bg-transparent data-[pressed]:text-gray-500`}
              onClick={() => {
                if (onChange && typeof onChange === "function") {
                  onChange(t);
                }
              }}
            >
              <span className="relative z-20 mix-blend-exclusion">{t}</span>
              {selectedTab === t && (
                <motion.div
                  layoutId={`motion_pill_${id}`}
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="absolute inset-0 z-10 bg-white"
                />
              )}
            </Button>
          </div>
        ))}
      </div>
    );
  },
);

export default Tabs;
