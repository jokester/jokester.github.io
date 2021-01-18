import { FC, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useConstant from 'use-constant';
import { animationFrameScheduler, BehaviorSubject, interval } from 'rxjs';
import { map, scan, throttleTime } from 'rxjs/operators';
import { randomAlphaNum, randomHex } from '@jokester/ts-commonutil/lib/text/random-string';
import { randomInt } from 'fp-ts/Random';

interface FlyingText {
  nonce: string;
  text: string;
}

export const PocCssTransform: FC = () => {
  const clicked = useConstant(() => new BehaviorSubject(0));
  const [items, setItems] = useState<FlyingText[]>([]);

  useEffect(() => {
    const timer = interval(0.5e3);

    const itemSource = timer.pipe(map((_) => ({ nonce: randomHex(6), text: `item #${_}` })));
    const subscribe = itemSource.subscribe((newItem) => setItems((prev) => [...prev, newItem].slice(-50)));
    return () => subscribe.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={() => clicked.next(1 + clicked.value)} className="h-64 relative flex justify-center items-center ">
      {items.map((item) => (
        <FlyingTextLazy item={item} key={item.nonce} />
      ))}
    </div>
  );
};

const FlyingTextRaw: FC<{ item: FlyingText }> = (props) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const p = pRef.current;
    if (!p) return;

    p.style.transform = `translateY(${randomness.y()}px) translateX(${randomness.x()}px)`;

    requestAnimationFrame(() => {
      p.style.transition = 'ease-out 5s all';
      p.style.filter = `blur(5px) opacity(0)`;
      p.style.transform = `translateY(${randomness.y()}px) translateX(${randomness.x()}px) translateZ(${randomness.z()}px)`;
    });
  }, []);

  return (
    <p ref={pRef} className="absolute block">
      {props.item.text}
    </p>
  );
};

const FlyingTextLazy = memo(FlyingTextRaw, () => true);

const randomness = {
  x: randomInt(-300, 300),
  y: randomInt(-100, 100),
  z: randomInt(-5000, 0),
} as const;
