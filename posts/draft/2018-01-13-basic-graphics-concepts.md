---
title: Basic graphics concepts
---

This is a memo I used to show basic concepts in  at workplace.

## 2D Vector graphics

- Coordinates
    - 2D Linear Transform
        - scale
        - translate
        - rotation
        - skew
    - Matrix Representation
        - `x' = T x`
        - composable

- Vector
    - Line
        - Color
        - Width
        - LineCap
    - Multiline: Triangle / Rect / Polygon
        - Path
        - LineJoin
    - Circle, Ellipse

- Text
    - Font
    - Glyph
    - Weight (often in pound / pt)
    - Baseline

- Drawing API - high level
    - Browser: `HTMLCanvasElement`
    - Android: `Canvas`
    - iOS: `CGContext`

- Drawing API - low level
    - OpenGL / OpenGL ES

## Rendering: from vector to bitmap

## 3D graphics

Idea: project 3d point to a 2d point (perspective transformation).
