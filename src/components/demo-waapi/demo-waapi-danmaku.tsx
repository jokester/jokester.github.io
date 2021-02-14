import { Observable } from 'rxjs';
import { useEffect, useRef } from 'react';
import { randomRange } from 'fp-ts/Random';
import { pipe } from 'fp-ts/function';
import { io } from 'fp-ts';
import classNames from 'classnames';

export const WaapiDanmaku: React.FC<{ source$: Observable<string> }> = (props) => {
  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const div = divRef.current;

    const cameraDistance = 100;
    const sourceDistance = 110;

    const perspectiveHalfAngleH = Math.atan(div.clientWidth / 2 / sourceDistance);
    const perspectiveHalfAngleV = Math.atan(div.clientHeight / 2 / sourceDistance);
    const finalZ = 500;

    const randomness = {
      tx: pipe(
        randomRange(-div.clientWidth / 2, div.clientWidth / 2),
        // io.map((x) => `translateX(${x}px)`),
      ),
      ty: pipe(
        randomRange(-div.clientHeight / 2, div.clientHeight / 2),
        // io.map((y) => `translateY(${y}px)`),
      ),
    } as const;

    const s = props.source$.subscribe((content) => {
      const p = document.createElement('p');
      p.className = classNames('absolute');
      p.textContent = content;

      const tx = randomness.tx(),
        ty = randomness.ty(),
        rotateX = Math.atan(ty / cameraDistance),
        rotateY = Math.atan(tx / cameraDistance);

      div.appendChild(p);
      const a = p.animate(
        [
          {
            transform: [`translateZ(110px)`].join(' '),
            // filter: 'blur(0px)',
            offset: 0,
          },
          {
            transform: [
              //
              `translateX(${tx}px)`,
              `translateY(${ty}px)`,

              `translateZ(0px)`,
            ].join(' '),
            // filter: 'blur(0px)',
            offset: 0.382,
          },
          {
            transform: [
              `translateX(${(tx / cameraDistance) * (cameraDistance + 1000)}px)`,
              `translateY(${(ty / cameraDistance) * (cameraDistance + 1000)}px)`,
              // `rotateX(${rotateX}rad)`,
              // `rotateY(${rotateY}rad)`,
              `translateZ(-1000px)`,
              // `rotateX(${-rotateX}rad)`,
              // `rotateY(${-rotateY}rad)`,
            ].join(' '),
            offset: 0.9,
          },
          {
            transform: [
              `translateX(${(tx / cameraDistance) * (cameraDistance + finalZ)}px)`,
              `translateY(${(ty / cameraDistance) * (cameraDistance + finalZ)}px)`,
              // `rotateX(${rotateX}rad)`,
              // `rotateY(${rotateY}rad)`,
              `translateZ(${-finalZ}px)`,
              // `rotateX(${-rotateX}rad)`,
              // `rotateY(${-rotateY}rad)`,
            ].join(' '),
            // filter: `opacity(0) blur(1px)`, // NOTE: add filter to keyframes breaks font rendering?
            offset: 1,
          },
        ],
        {
          duration: 10e3,
          composite: 'add',
          easing: 'linear',
          iterationComposite: 'replace',
        },
      );

      a.finished
        .then(() => {
          p.style.transform = [
            `translateX(${(tx / cameraDistance) * (cameraDistance + finalZ)}px)`,
            `translateY(${(ty / cameraDistance) * (cameraDistance + finalZ)}px)`,
            // `rotateX(${rotateX}rad)`,
            // `rotateY(${rotateY}rad)`,
            `translateZ(${-finalZ}px)`,
            // `rotateX(${-rotateX}rad)`,
            // `rotateY(${-rotateY}rad)`,
          ].join(' ');
          return p.animate(
            { filter: ['', 'opacity(0) blur(1000px)'] },
            {
              duration: 1e3,
              composite: 'accumulate',
            },
          ).finished;
        })
        .then(() => p.remove());
    });

    return () => s.unsubscribe();
  }, [props.source$]);

  return (
    <div className="bg-white">
      <div
        ref={divRef}
        style={{ height: '50vh', perspective: '100px' }}
        className={classNames('text-black flex justify-center items-center overflow-hidden')}
      />
    </div>
  );
};

function randomSource(container: HTMLDivElement) {}
