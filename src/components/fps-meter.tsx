import { FC, useState } from 'react';
import { animationFrameScheduler, interval, Observable } from 'rxjs';
import { map, scan, throttleTime } from 'rxjs/operators';
import useConstant from 'use-constant';
import { useObservable } from 'react-use';

function fpsObservable(numFrame: number): Observable<number> {
  return interval(0, animationFrameScheduler).pipe(
    map((frameNo) => Date.now()),
    scan((acc, l) => [...acc, l].slice(-numFrame), [] as number[]),
    map((frames) => (frames.length >= numFrame ? (numFrame * 1e3) / (frames[frames.length - 1] - frames[0]) : -1)),
    throttleTime(0.5e3),
  );
}

export const FpsMeter: FC = () => {
  const $fps5 = useConstant(() => fpsObservable(5)),
    $fps60 = useConstant(() => fpsObservable(60)),
    $fps300 = useConstant(() => fpsObservable(300));

  const fps5 = useObservable($fps5, -1),
    fps60 = useObservable($fps60, -1),
    fps300 = useObservable($fps300, -1);

  return (
    <div className="p-4 border-black border inline-block w-64">
      <p>fps (5frames): {fps5.toFixed(3)}</p>
      <p>fps (60frames): {fps60.toFixed(3)}</p>
      <p>fps (300frames): {fps300.toFixed(3)}</p>
    </div>
  );
};
