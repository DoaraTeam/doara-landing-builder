"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { AnimationConfig } from "@/types/landing";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/use-scroll-animation";

interface AnimatedSectionProps {
  /**
   * Content to animate
   */
  children: ReactNode;
  /**
   * Animation configuration
   */
  animation?: AnimationConfig;
  /**
   * CSS class name for the wrapper
   */
  className?: string;
  /**
   * Whether to animate children with stagger effect
   */
  stagger?: boolean;
  /**
   * Delay between each child animation (in seconds)
   */
  staggerDelay?: number;
}

/**
 * Wrapper component that adds scroll-triggered animations to its children
 *
 * @example
 * ```tsx
 * <AnimatedSection animation={{ type: "fadeInUp", duration: 800 }}>
 *   <Hero config={heroConfig} />
 * </AnimatedSection>
 * ```
 *
 * @example With stagger for lists
 * ```tsx
 * <AnimatedSection
 *   animation={{ type: "fadeInUp" }}
 *   stagger
 *   staggerDelay={0.1}
 * >
 *   <div className="grid grid-cols-3">
 *     {items.map(item => <Card key={item.id} {...item} />)}
 *   </div>
 * </AnimatedSection>
 * ```
 */
export function AnimatedSection({
  children,
  animation,
  className = "",
  stagger = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) {
  // If no animation or animation type is "none", render without animation
  if (!animation || animation.type === "none") {
    return <div className={className}>{children}</div>;
  }

  // Use stagger animation for lists/grids
  if (stagger) {
    return (
      <StaggeredSection animation={animation} className={className} staggerDelay={staggerDelay}>
        {children}
      </StaggeredSection>
    );
  }

  // Regular single animation
  return (
    <SimpleAnimatedSection animation={animation} className={className}>
      {children}
    </SimpleAnimatedSection>
  );
}

/**
 * Simple animated section without stagger
 */
function SimpleAnimatedSection({
  children,
  animation,
  className,
}: Omit<AnimatedSectionProps, "stagger" | "staggerDelay"> & { animation: AnimationConfig }) {
  const scrollAnimation = useScrollAnimation({ animation });

  return (
    <motion.div
      ref={scrollAnimation.ref}
      initial={scrollAnimation.initial}
      animate={scrollAnimation.animate}
      variants={scrollAnimation.variants}
      transition={{
        duration: scrollAnimation.transition.duration,
        delay: scrollAnimation.transition.delay,
        ease: scrollAnimation.transition.ease as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated section with stagger effect for children
 */
function StaggeredSection({
  children,
  animation,
  className,
  staggerDelay,
}: Omit<AnimatedSectionProps, "stagger"> & {
  animation: AnimationConfig;
  staggerDelay: number;
}) {
  const staggerAnimation = useStaggerAnimation({ animation, staggerDelay });

  return (
    <motion.div
      ref={staggerAnimation.ref}
      initial="hidden"
      animate={staggerAnimation.animate}
      variants={staggerAnimation.containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
