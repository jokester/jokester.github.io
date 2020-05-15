---
title: Disabling VP9 in Android Chrome's WebRTC
created_at: 2017-02-20
---

- toc
{:toc}

NOTE: due to complexity and opaqueness (to a JavaScript developer) of WebRTC technologies, this may not be a complete solution.
You are advised to test and benchmark thorough before using this hack in real product.

### Problem: encoding with VP9 can cause high CPU load in an old tablet

The problem happened with a Lenovo YOGA tablet and its ARMv7 MSM8909 processor.

When a video is being send to the other browse, the FPS of all videos falls to less than 1.

We finally located the direct cause of CPU load: encoding video stream in VP9 took `400 ~ 600ms` per frame (the avarage encode time can be found in `chrome://webrtc-internals`).

### Fix: force Chrome to use VP8

Local offer SDP lists video formats that can be used in RTCPeerConnection.
If we remove VP9 from SDP before passing it to `peerConn.setLocalDescription()`, Chrome will use other codecs instead.

I am attaching an example SDP got from [WebRTC samples Munge SDP](https://webrtc.github.io/samples/src/content/peerconnection/munge-sdp/).
Changes are listed in `diff` format. Lines started with `!` are comments and not part of SDP.

```diff
--- original SDP got from peerConn.createOffer()
+++ new SDP to use in peerConn.setLocalDescription()
 v=0
 o=- 1663534131550752306 2 IN IP4 127.0.0.1
 s=-
 t=0 0
 a=group:BUNDLE audio video data
 a=msid-semantic: WMS NFf4pxQvqNFomEdHC0fI1kwlxx5O9NbeAUUs
 m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126
 c=IN IP4 0.0.0.0
 a=rtcp:9 IN IP4 0.0.0.0
 a=ice-ufrag:VoeE
 a=ice-pwd:ZMrKM1piGvOdgZxVOOLlMOMq
 a=fingerprint:sha-256 00:3A:44:D4:B6:9D:8D:88:87:84:F8:18:29:8F:64:E8:AE:59:3E:D6:33:6C:74:88:4D:F8:88:1C:0E:C6:48:F9
 a=setup:actpass
 a=mid:audio
 a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
 a=sendrecv
 a=rtcp-mux
 a=rtpmap:111 opus/48000/2
 a=rtcp-fb:111 transport-cc
 a=fmtp:111 minptime=10;useinbandfec=1
 a=rtpmap:103 ISAC/16000
 a=rtpmap:104 ISAC/32000
 a=rtpmap:9 G722/8000
 a=rtpmap:0 PCMU/8000
 a=rtpmap:8 PCMA/8000
 a=rtpmap:106 CN/32000
 a=rtpmap:105 CN/16000
 a=rtpmap:13 CN/8000
 a=rtpmap:126 telephone-event/8000
 a=ssrc:795782633 cname:/nX1r0P1oSOr0ktw
 a=ssrc:795782633 msid:NFf4pxQvqNFomEdHC0fI1kwlxx5O9NbeAUUs 44267d8c-e64a-4c3c-b40f-975dfa4a5ea4
 a=ssrc:795782633 mslabel:NFf4pxQvqNFomEdHC0fI1kwlxx5O9NbeAUUs
 a=ssrc:795782633 label:44267d8c-e64a-4c3c-b40f-975dfa4a5ea4
! "m=" denotes "Media Descriptions".
! The numbers 100 101 ... are "payload type number" that are used to index payload.
! We are removing 101, the payload type number of VP9 here
-m=video 9 UDP/TLS/RTP/SAVPF 100 101 107 116 117 96 97 99 98
+m=video 9 UDP/TLS/RTP/SAVPF 100 107 116 117 96 97 99 98
 c=IN IP4 0.0.0.0
 a=rtcp:9 IN IP4 0.0.0.0
 a=ice-ufrag:VoeE
 a=ice-pwd:ZMrKM1piGvOdgZxVOOLlMOMq
 a=fingerprint:sha-256 00:3A:44:D4:B6:9D:8D:88:87:84:F8:18:29:8F:64:E8:AE:59:3E:D6:33:6C:74:88:4D:F8:88:1C:0E:C6:48:F9
 a=setup:actpass
 a=mid:video
 a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
 a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
 a=extmap:4 urn:3gpp:video-orientation
 a=extmap:5 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
 a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay
 a=sendrecv
 a=rtcp-mux
 a=rtcp-rsize
 a=rtpmap:100 VP8/90000
 a=rtcp-fb:100 ccm fir
 a=rtcp-fb:100 nack
 a=rtcp-fb:100 nack pli
 a=rtcp-fb:100 goog-remb
 a=rtcp-fb:100 transport-cc
! "a=" are attributes associated with each payload type number
! this tells us that 101 is the payload type number to remove
-a=rtpmap:101 VP9/90000
-a=rtcp-fb:101 ccm fir
-a=rtcp-fb:101 nack
-a=rtcp-fb:101 nack pli
-a=rtcp-fb:101 goog-remb
-a=rtcp-fb:101 transport-cc
 a=rtpmap:107 H264/90000
 a=rtcp-fb:107 ccm fir
 a=rtcp-fb:107 nack
 a=rtcp-fb:107 nack pli
 a=rtcp-fb:107 goog-remb
 a=rtcp-fb:107 transport-cc
 a=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f
 a=rtpmap:116 red/90000
 a=rtpmap:117 ulpfec/90000
 a=rtpmap:96 rtx/90000
 a=fmtp:96 apt=100
 a=rtpmap:97 rtx/90000
! "a=fmtp" attribute is described in RFC4588
! In short, apt=101 referes to previous VP9 payload type.
! We are changing it to 100 (VP8 payload) here.
-a=fmtp:97 apt=101
+a=fmtp:97 apt=100
 a=rtpmap:99 rtx/90000
 a=fmtp:99 apt=107
 a=rtpmap:98 rtx/90000
 a=fmtp:98 apt=116
 a=ssrc-group:FID 1412078074 1853322751
 a=ssrc:1412078074 cname:/nX1r0P1oSOr0ktw
 a=ssrc:1412078074 msid:NFf4pxQvqNFomEdHC0fI1kwlxx5O9NbeAUUs 8d3831fd-53dd-464a-8a24-0b21f2465e3d
 a=ssrc:1412078074 mslabel:NFf4pxQvqNFomEdHC0fI1kwlxx5O9NbeAUUs
 a=ssrc:1412078074 label:8d3831fd-53dd-464a-8a24-0b21f2465e3d
 a=ssrc:1853322751 cname:/nX1r0P1oSOr0ktw
 a=ssrc:1853322751 msid:NFf4pxQvqNFomEdHC0fI1kwlxx5O9NbeAUUs 8d3831fd-53dd-464a-8a24-0b21f2465e3d
 a=ssrc:1853322751 mslabel:NFf4pxQvqNFomEdHC0fI1kwlxx5O9NbeAUUs
 a=ssrc:1853322751 label:8d3831fd-53dd-464a-8a24-0b21f2465e3d
 m=application 9 DTLS/SCTP 5000
 c=IN IP4 0.0.0.0
 a=ice-ufrag:VoeE
 a=ice-pwd:ZMrKM1piGvOdgZxVOOLlMOMq
 a=fingerprint:sha-256 00:3A:44:D4:B6:9D:8D:88:87:84:F8:18:29:8F:64:E8:AE:59:3E:D6:33:6C:74:88:4D:F8:88:1C:0E:C6:48:F9
 a=setup:actpass
 a=mid:data
 a=sctpmap:5000 webrtc-datachannel 1024
```

Also note that if you split SDP string into lines, they should be joined with `\r\n`.
This is stated in [RFC4566: SDP](https://tools.ietf.org/html/rfc4566) (`The sequence CRLF (0x0d0a) is used to end a record, blah`). Missed it in my first try.

We decided to use VP8 because it should almost be available.
[Android Compatibility Definition Document](https://source.android.com/compatibility/android-cdd.html#5_1_3_video_codecs)
says that all devices with Android `>= 4.3` is *required* to have VP8 encoder.

### Caveats / TBD

Editing SDP worked for me, but this is far from a perfect fix. To name a few:

- VP9 is stated to save 30% of bandwidth than VP8 ([src](https://developers.google.com/web/updates/2016/01/vp9-webrtc)).
- I did not find a way to detect hardware encoding capability in mobile browser (any browser actually). The best workaround I could think of is to apply this hack to *all* Android Chrome versions.

### Reference

- [SoCs Supporting VP8/VP9](http://wiki.webmproject.org/hardware/socs)
- [RFC4566 / SDP](https://tools.ietf.org/html/rfc4566)
- [RFC4588 / RTP Retransmission Payload Format](https://tools.ietf.org/html/rfc4588)

