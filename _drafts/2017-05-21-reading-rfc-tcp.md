## Core Concepts

- Socket = IP + Port
- underlying: datagram protocol that can be unrealible
- TCB: ~ Control Block, consists of:
    - 2 sockets that identifies a connection
    - send/receive buffer
- control flag of segments
    - SYN
    - ACK
    - FIN

## TCP calls vs UNIX Socket API

- `active OPEN`
- `passive OPEN`
- `SEND`
    - `PUSH` flag:
  whether the data
  in that call (and any preceeding calls) should be immediately pushed
  through to the receiving user
- hey

## TIL: SYN and 3-way hand shake

```text
p12

  The procedures to establish connections utilize the synchronize (SYN)
  control flag and involves an exchange of three messages.  This
  exchange has been termed a three-way hand shake [3].

```

## TIL: `passive OPEN` can specify a remote socket


## TIL: `listen / accept` is not absolute necessary

```text
p11

  ...Two processes which issue active OPENs to each
  other at the same time will be correctly connected.  This flexibility
  is critical for the support of distributed computing in which
  components act asynchronously with respect to each other.

```

## TIL: 1 socket -- multiple TCB

```text
p12

  If there are several pending passive OPENs (recorded in TCBs) with the
  same local socket, an foreign active OPEN will be matched to a TCB
  with the specific foreign socket in the foreign active OPEN, if such a
  TCB exists, before selecting a TCB with an unspecified foreign socket.

```