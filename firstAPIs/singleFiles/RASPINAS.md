I want to make a Raspberry Pi 3 into a NAS (Network-attached storage)

To Do This I used:
Rasberry Pi 3 
32GB Micro SD card
Raspbian Buster Lite (iso)
Open Media Vault (NAS software)
Balena Etcher (iso burner)
PuTTY  (network file transfer SSH )

https://www.youtube.com/watch?v=sYDyvr9Uc6Y - Walkthrough

https://github.com/OpenMediaVault-Plugin-Developers/installScript/blob/master/README.md - OMV install script

Raspberry Pi Commands 
    sudo raspi-config
    ifconfig

PuTTY Commands 
    wget -O - https://github.com/OpenMediaVault-Plugin-Developers/installScript/raw/master/install | sudo bash
