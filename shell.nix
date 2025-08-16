{ pkgs ? import <nixpkgs> {} }:

let

in pkgs.mkShell {
    nativeBuildInputs = with pkgs; [ 
        nodejs_latest
        tailwindcss
    ];
}

