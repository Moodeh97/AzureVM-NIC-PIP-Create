import fetch from "node-fetch"

const publicURL = "https://management.azure.com/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}?api-version=2022-05-01"

const NIURL = "https://management.azure.com/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}?api-version=2022-05-01"

const VMURL = "https://management.azure.com/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}?api-version=2022-08-01"
 
const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NjYzMTdjYi1lOTQ4LTRlNWYtOGNlYy1kYWJjOGUyZmQ1ZGEvIiwiaWF0IjoxNjY4NzAxODU2LCJuYmYiOjE2Njg3MDE4NTYsImV4cCI6MTY2ODcwNjUwMywiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQUhMZTc1TXZseWIydFl2MnQyS2tRRm51VmYvclB4Myt4Q1hsRWQzcWVodmhLS09vSHFadFpTaGVEVkhUWnd5Q3ZZbENNZmc3Zjc4TllNb2pUMUZBaUJYbnR0TjNqZkRKKzFTbTF0RC9QQ3NNPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiIwNGIwNzc5NS04ZGRiLTQ2MWEtYmJlZS0wMmY5ZTFiZjdiNDYiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6Ik1vb2R5IiwiZ2l2ZW5fbmFtZSI6IkRhcmEiLCJncm91cHMiOlsiODdmNjAwM2QtOTQ3MC00MzhmLWJmZWYtODEzYjM3ZmMyYjY4IiwiZDJhNmE4ZWYtNGQyNi00ZDk1LWJkMTEtYWExZWM2MTlmODE4IiwiOTdhZjgxMmQtOTZlOS00ZjAxLThhMTEtNzU4MDMzNzYyMTdhIiwiOGM4MTg2ZWEtNDJhNC00NGFmLThhNzgtYWU5MTQwMTFlNmI0IiwiNWFkN2Q2YjQtYWRhZi00YjlkLTk1N2YtMGYzYjYxNGJlZTYwIiwiMTI1Y2FiN2MtZjllYi00M2U1LTllMjEtNWUzYjVkZGQwNWJhIiwiOGFjMTU0ZGQtZDQ1Zi00YzQ2LTk0ZTUtYmI3OGZlZmEzYWVmIl0sImlwYWRkciI6IjIwLjIyMy4xNDYuNDciLCJuYW1lIjoiQzE4NzcxMzMxIERhcmEgTW9vZHkiLCJvaWQiOiI0OGU0NzZkMy0xNWYzLTRlMDItYmY5OS00MGRiYWVmMmY0MDAiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjAyNTQyOTI2NS0xOTU4MzY3NDc2LTcyNTM0NTU0My0yOTIxNTkiLCJwdWlkIjoiMTAwMzIwMDA1ODVBRkZBQiIsInJoIjoiMC5BVEVBeXhkamRranBYMDZNN05xOGppX1Yya1pJZjNrQXV0ZFB1a1Bhd2ZqMk1CTXhBS1UuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiZDIzNVRHanVsU2Y5N2tPeE9FQk9GVVFzQnd4Y0dacV9TNUhQY216RlJWdyIsInRpZCI6Ijc2NjMxN2NiLWU5NDgtNGU1Zi04Y2VjLWRhYmM4ZTJmZDVkYSIsInVuaXF1ZV9uYW1lIjoiQzE4NzcxMzMxQG15dHVkdWJsaW4uaWUiLCJ1cG4iOiJDMTg3NzEzMzFAbXl0dWR1Ymxpbi5pZSIsInV0aSI6Il9FY1NOQlRNRVVXLW1iYzJHbTBWQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc190Y2R0IjoxNTI1MzM4OTQxfQ.j2mcrg8lnp6cfkUNlPnkE0UDBrb7ZxIh4_1euGXy_Z0eHGye51V2-MHzEFOdcsT2b8cFCncCx1TE5x27EwXk4CgZkODiB49YpaJUefBeIsTCJjqchKkYyMAd9CqQ4n-OIruc_xBN7AQ_bzNsPSxhoL5l6KB8zB3aQXrolZiSdbLvzmOe925fKEsL2HntfdMZOCT2fQl9aKIpRbxPp9X7JgJrxx9AZn_1rnOFOY0zcyM_9rZYbqRuaZ5WiMq-bydC6RjbGIPLyntGBa_5x0BVBO__P5rGZoKEQ-XVnfQyL4h5KHKoZuzAfwQjqTj3dU46gPiHJynVBC_8O37txb_3Jg"
 

async function createPublicIP (){

    await fetch(publicURL, {

        method: 'PUT',

        headers:{

            'Content-Type':'application/json',

            'Authorization': token

        },

        body: JSON.stringify(

            {

                "properties": {

                    "publicIPAllocationMethod": "Static",

                    "idleTimeoutInMinutes": 10,

                    "publicIPAddressVersion": "IPv4"

                    },

                    "sku": {

                    "name": "Basic"

                    },

                    "location": "northeurope"

                   

            }

        )

    }).then(res => res.json())

    .then(res => console.log(res))

}

async function createVM (){

    await fetch(publicURL, {

        method: 'PUT',

        headers:{

            'Content-Type':'application/json',

            'Authorization': token

        },

        body: JSON.stringify(

            {
                "name": "dara",
                "id": "/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/Cloud-Computing-Mood_group/providers/Microsoft.Compute/virtualMachines/dara",
                "type": "Microsoft.Compute/virtualMachines",
                "location": "westeurope",
                "properties": {
                    "vmId": "9084bbe5-e291-4e74-86c9-379499c9ba54",
                    "hardwareProfile": {
                        "vmSize": "Standard_B2s"
                    },
                    "storageProfile": {
                        "imageReference": {
                            "publisher": "canonical",
                            "offer": "0001-com-ubuntu-server-focal",
                            "sku": "20_04-lts-gen2",
                            "version": "latest",
                            "exactVersion": "20.04.202209200"
                        },
                        "osDisk": {
                            "osType": "Linux",
                            "name": "dara_OsDisk_1_34213fdc8236451084de01a3e825ec34",
                            "createOption": "FromImage",
                            "caching": "ReadWrite",
                            "managedDisk": {
                                "id": "/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/CLOUD-COMPUTING-MOOD_GROUP/providers/Microsoft.Compute/disks/dara_OsDisk_1_34213fdc8236451084de01a3e825ec34"
                            },
                            "deleteOption": "Delete"
                        },
                        "dataDisks": []
                    },
                    "osProfile": {
                        "computerName": "dara",
                        "adminUsername": "dara",
                        "linuxConfiguration": {
                            "disablePasswordAuthentication": true,
                            "ssh": {
                                "publicKeys": [
                                    {
                                        "path": "/home/dara/.ssh/authorized_keys",
                                        "keyData": "---- BEGIN SSH2 PUBLIC KEY ----\nComment: \"rsa-key-20220922\"\nAAAAB3NzaC1yc2EAAAADAQABAAABAQDgUnrnwokeqKpHRlcgHSgrjVia52Qw3NAe\nclKGlFv7xgT4mHU4w22FNowAOJD5eO9iw3yVpwjccUYy72ocIjEuvd0/eeZLKOVt\nepFMoBjCXr7ib4nx00QKl56QRGsl54tQ17gGu6hSJyXXVnAzbYOgajSAYtokpJ/I\ni/iPYORrDQGj9wNBfwkmN2zXY+XpJ4SOEq0uakx2MV14hd0yqlc6CZ3ZRdhHmLJ2\njpxTWedvyn5rFSlM9iVjlPu0xs/Mqxl6RYZIJVt7I2y1yFw9IKJ7b+tXm1CgXCGp\nXDo7IwvA5ih/OkjDTNQcHa7cOnSlbvHl9fIeg6pJTxVm1oKFgFcT\n---- END SSH2 PUBLIC KEY ----"
                                    }
                                ]
                            },
                            "provisionVMAgent": true,
                            "patchSettings": {
                                "patchMode": "ImageDefault",
                                "assessmentMode": "ImageDefault"
                            }
                        },
                        "secrets": [],
                        "allowExtensionOperations": true,
                        "requireGuestProvisionSignal": true
                    },
                    "networkProfile": {
                        "networkInterfaces": [
                            {
                                "id": "/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/Cloud-Computing-Mood_group/providers/Microsoft.Network/networkInterfaces/dara681_z1",
                                "properties": {
                                    "deleteOption": "Delete"
                                }
                            }
                        ]
                    },
                    "diagnosticsProfile": {
                        "bootDiagnostics": {
                            "enabled": true
                        }
                    },
                    "provisioningState": "Succeeded"
                },
                "zones": [
                    "1"
                ]
            }

        )

    }).then(res => res.json())

    .then(res => console.log(res))

}


async function createNIC (){

    await fetch(publicURL, {

        method: 'PUT',

        headers:{

            'Content-Type':'application/json',

            'Authorization': token

        },

        body: JSON.stringify(

            {
                "name": "Cloud_Computing_Interface",
                "id": "/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/Cloud-Computing-Mood_group/providers/Microsoft.Network/networkInterfaces/Cloud_Computing_Interface",
                "etag": "W/\"cd21442d-4e3a-4c27-8489-632d8eb487aa\"",
                "tags": {},
                "properties": {
                    "provisioningState": "Succeeded",
                    "resourceGuid": "4b02f686-a274-4bf8-87fc-2a2b8ab74fd6",
                    "ipConfigurations": [
                        {
                            "name": "Ipv4config",
                            "id": "/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/Cloud-Computing-Mood_group/providers/Microsoft.Network/networkInterfaces/Cloud_Computing_Interface/ipConfigurations/Ipv4config",
                            "etag": "W/\"cd21442d-4e3a-4c27-8489-632d8eb487aa\"",
                            "type": "Microsoft.Network/networkInterfaces/ipConfigurations",
                            "properties": {
                                "provisioningState": "Succeeded",
                                "privateIPAddress": "10.0.0.5",
                                "privateIPAllocationMethod": "Dynamic",
                                "subnet": {
                                    "id": "/subscriptions/0b1ef12c-7c2a-46c4-96a4-f126cce26750/resourceGroups/Cloud-Computing-Mood_group/providers/Microsoft.Network/virtualNetworks/Cloud-Computing-Mood_group-vnet/subnets/default"
                                },
                                "primary": true,
                                "privateIPAddressVersion": "IPv4"
                            }
                        }
                    ],
                    "dnsSettings": {
                        "dnsServers": [],
                        "appliedDnsServers": [],
                        "internalDomainNameSuffix": "dvgrnqgnymtefojds0fdi4xxth.ax.internal.cloudapp.net"
                    },
                    "enableAcceleratedNetworking": false,
                    "vnetEncryptionSupported": false,
                    "enableIPForwarding": false,
                    "hostedWorkloads": [],
                    "tapConfigurations": [],
                    "nicType": "Standard"
                },
                "type": "Microsoft.Network/networkInterfaces",
                "location": "westeurope",
                "kind": "Regular"
            }

        )

    }).then(res => res.json())

    .then(res => console.log(res))

}


createVM();
createNIC();
createPublicIP();
