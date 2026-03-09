"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Stepper - Multi-step wizard with progress indication
 * Perfect for onboarding flows, checkout processes, and form wizards
 *
 * @example
 * const [step, setStep] = useState(0);
 * <Stepper
 *   steps={["Account", "Profile", "Confirm"]}
 *   currentStep={step}
 *   onStepClick={setStep}
 * />
 */

interface Step {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  steps: (string | Step)[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  variant?: "default" | "dots" | "progress" | "numbered" | "vertical";
  allowClickPrevious?: boolean;
  showLabels?: boolean;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  variant = "default",
  allowClickPrevious = true,
  showLabels = true,
  className,
}: StepperProps) {
  const normalizedSteps: Step[] = steps.map((step) =>
    typeof step === "string" ? { label: step } : step
  );

  const handleStepClick = (index: number) => {
    if (!onStepClick) return;
    if (allowClickPrevious && index < currentStep) {
      onStepClick(index);
    }
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-2", className)}>
        {normalizedSteps.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleStepClick(index)}
            disabled={!allowClickPrevious || index >= currentStep}
            className={cn(
              "relative transition-all",
              allowClickPrevious && index < currentStep && "cursor-pointer"
            )}
            whileHover={allowClickPrevious && index < currentStep ? { scale: 1.2 } : undefined}
          >
            <motion.div
              className={cn(
                "rounded-full transition-all",
                index === currentStep
                  ? "w-8 h-3 bg-neutral-900 dark:bg-white"
                  : index < currentStep
                  ? "w-3 h-3 bg-neutral-900 dark:bg-white"
                  : "w-3 h-3 bg-neutral-300 dark:bg-neutral-700"
              )}
              layout
            />
          </motion.button>
        ))}
      </div>
    );
  }

  if (variant === "progress") {
    const progress = (currentStep / (normalizedSteps.length - 1)) * 100;
    return (
      <div className={cn("space-y-4", className)}>
        <div className="relative h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-neutral-900 dark:bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        {showLabels && (
          <div className="flex justify-between text-sm">
            <span className="font-medium text-neutral-900 dark:text-white">
              {normalizedSteps[currentStep]?.label}
            </span>
            <span className="text-neutral-500">
              Step {currentStep + 1} of {normalizedSteps.length}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("space-y-0", className)}>
        {normalizedSteps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === normalizedSteps.length - 1;

          return (
            <div key={index} className="flex">
              {/* Line and dot */}
              <div className="flex flex-col items-center mr-4">
                <motion.button
                  onClick={() => handleStepClick(index)}
                  disabled={!allowClickPrevious || index >= currentStep}
                  className={cn(
                    "relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                    isCompleted
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                      : isActive
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 ring-4 ring-neutral-200 dark:ring-neutral-700"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500",
                    allowClickPrevious && isCompleted && "cursor-pointer hover:ring-2 hover:ring-neutral-400"
                  )}
                  whileTap={isCompleted ? { scale: 0.95 } : undefined}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.icon || index + 1
                  )}
                </motion.button>
                {!isLast && (
                  <div className={cn(
                    "w-0.5 h-16 transition-colors",
                    isCompleted ? "bg-neutral-900 dark:bg-white" : "bg-neutral-200 dark:bg-neutral-700"
                  )} />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-8", isLast && "pb-0")}>
                <h4 className={cn(
                  "font-medium",
                  isActive || isCompleted ? "text-neutral-900 dark:text-white" : "text-neutral-500"
                )}>
                  {step.label}
                </h4>
                {step.description && (
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Default and numbered variants
  return (
    <div className={cn("flex items-center", className)}>
      {normalizedSteps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === normalizedSteps.length - 1;

        return (
          <React.Fragment key={index}>
            <motion.button
              onClick={() => handleStepClick(index)}
              disabled={!allowClickPrevious || index >= currentStep}
              className={cn(
                "flex flex-col items-center",
                allowClickPrevious && isCompleted && "cursor-pointer"
              )}
              whileHover={allowClickPrevious && isCompleted ? { scale: 1.05 } : undefined}
            >
              {/* Circle */}
              <motion.div
                className={cn(
                  "relative w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                  isCompleted
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                    : isActive
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 ring-4 ring-neutral-200 dark:ring-neutral-700"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500"
                )}
                layout
              >
                <AnimatePresence mode="wait">
                  {isCompleted ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <motion.span
                      key="number"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {step.icon || index + 1}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Label */}
              {showLabels && (
                <span className={cn(
                  "mt-2 text-sm font-medium transition-colors",
                  isActive || isCompleted ? "text-neutral-900 dark:text-white" : "text-neutral-500"
                )}>
                  {step.label}
                </span>
              )}
            </motion.button>

            {/* Connector */}
            {!isLast && (
              <div className={cn(
                "flex-1 h-0.5 mx-4",
                showLabels && "mb-8"
              )}>
                <div className="relative h-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-neutral-900 dark:bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/**
 * StepperContent - Animated content container for stepper
 */
interface StepperContentProps {
  currentStep: number;
  children: React.ReactNode[];
  className?: string;
}

export function StepperContent({
  currentStep,
  children,
  className,
}: StepperContentProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * StepperNavigation - Previous/Next buttons for stepper
 */
interface StepperNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  completeLabel?: string;
  isNextDisabled?: boolean;
  className?: string;
}

export function StepperNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onComplete,
  previousLabel = "Previous",
  nextLabel = "Next",
  completeLabel = "Complete",
  isNextDisabled = false,
  className,
}: StepperNavigationProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <motion.button
        onClick={onPrevious}
        disabled={isFirst}
        className={cn(
          "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
          isFirst
            ? "opacity-0 cursor-default"
            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
        )}
        whileHover={!isFirst ? { scale: 1.02 } : undefined}
        whileTap={!isFirst ? { scale: 0.98 } : undefined}
      >
        {previousLabel}
      </motion.button>

      <motion.button
        onClick={isLast ? onComplete : onNext}
        disabled={isNextDisabled}
        className={cn(
          "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
          isLast
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100",
          isNextDisabled && "opacity-50 cursor-not-allowed"
        )}
        whileHover={!isNextDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isNextDisabled ? { scale: 0.98 } : undefined}
      >
        {isLast ? completeLabel : nextLabel}
      </motion.button>
    </div>
  );
}

/**
 * Wizard - Complete wizard component combining Stepper, Content, and Navigation
 */
interface WizardStep {
  label: string;
  description?: string;
  content: React.ReactNode;
  isValid?: boolean;
}

interface WizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  variant?: "default" | "vertical";
  className?: string;
}

export function Wizard({
  steps,
  onComplete,
  variant = "default",
  className,
}: WizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextDisabled = steps[currentStep]?.isValid === false;

  if (variant === "vertical") {
    return (
      <div className={cn("flex gap-8", className)}>
        <div className="w-64 flex-shrink-0">
          <Stepper
            steps={steps.map((s) => ({ label: s.label, description: s.description }))}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            variant="vertical"
          />
        </div>
        <div className="flex-1 space-y-6">
          <StepperContent currentStep={currentStep}>
            {steps.map((step) => step.content)}
          </StepperContent>
          <StepperNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onComplete={onComplete}
            isNextDisabled={isNextDisabled}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      <Stepper
        steps={steps.map((s) => ({ label: s.label, description: s.description }))}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />
      <StepperContent currentStep={currentStep}>
        {steps.map((step) => step.content)}
      </StepperContent>
      <StepperNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onComplete={onComplete}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
}
