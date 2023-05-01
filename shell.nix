{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/refs/tags/22.05.tar.gz") { } }:
pkgs.mkShell {
  packages = [
	  # Render uses python 3.7.10
    (pkgs.python37.withPackages (ps: with ps;[
      pip
      virtualenv
    ]))
    pkgs.yarn
    pkgs.nodejs-18_x
		pkgs.libmysqlclient
  ];
}
