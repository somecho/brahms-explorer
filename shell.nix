{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/refs/tags/23.05-pre.tar.gz") { } }:
pkgs.mkShell {
  packages = [
    pkgs.yarn
		pkgs.python37
  ];
}
