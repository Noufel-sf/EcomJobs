'use client';

import { SlidingNumber } from '@/components/animate-ui/text/sliding-number';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Counter({
  number,
  setNumber,
  className, 
  slidingNumberProps,
  buttonProps,
  transition = { type: 'spring', bounce: 0, stiffness: 300, damping: 30 },
  ...props
}) {
  return (
    <div
      data-slot="counter"
      layout
      transition={transition}
      className={cn(
        'flex items-center gap-x-2 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800',
        className
      )}
      {...props}>
      <div>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(number - 1)}
          className={cn(
            'bg-white dark:bg-neutral-950 hover:bg-white/70 dark:hover:bg-neutral-950/70 text-neutral-950 dark:text-white text-2xl font-light pb-[3px]',
            buttonProps?.className
          )}>
          -
        </Button>
      </div>
      <SlidingNumber
        number={number}
        {...slidingNumberProps}
        className={cn('text-lg', slidingNumberProps?.className)} />
      <div>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(number + 1)}
          className={cn(
            'bg-white dark:bg-neutral-950 hover:bg-white/70 dark:hover:bg-neutral-950/70 text-neutral-950 dark:text-white text-2xl font-light pb-[3px]',
            buttonProps?.className
          )}>
          +
        </Button>
      </div>
    </div>
  );
}

export { Counter };
