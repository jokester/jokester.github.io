import { useRef, useState } from 'react';
import { useAsyncEffect } from '@jokester/ts-commonutil/lib/react/hook/use-async-effect';
import { wait } from '@jokester/ts-commonutil/lib/concurrency/timing';
import styles from './reveal.module.scss';
import clsx from 'clsx';

export function SlideDemo() {
  const [slideText, setSlideText] = useState<null | string>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  useAsyncEffect(async (running, released) => {
    await wait(1e3);
    if (!running.current) return;

    setSlideText(
      `
## Slide 1
A paragraph with some text and a [link](https://hakim.se).
---
## Slide 2
---
## Slide 3
    `.trim(),
    );

    await wait(1e3);
    if (!sectionRef.current) return;

    const [{ default: Reveal }, { default: RevealMarkdown }] = await Promise.all([
      import('reveal.js'),
      import('reveal.js/plugin/markdown/markdown'),
    ]);
    const api = new Reveal(sectionRef.current, {
      controls: true,
      progress: true,
      history: true,
      center: true,
      plugins: [RevealMarkdown],
    });
    if (1) {
      // return;
    }
    console.debug('reveal api', api);
    await api.initialize();
    await released;
    api.destroy();
  }, []);

  if (!slideText) {
    return <div>loading...</div>;
  }
  return (
    <div className={styles.revealRoot}>
      <div className={clsx('reveal')} ref={sectionRef}>
        <div className="slides">
          <section data-markdown="">
            <script type="text/template">
              {`
            
## Slide 1
A paragraph with some text and a [link](https://hakim.se).

---

## Slide 2

---

## Slide 3
      
      
      `.trim()}
            </script>
          </section>
        </div>
      </div>
    </div>
  );
}
