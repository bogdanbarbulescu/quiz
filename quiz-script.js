// quiz-script.js (Handles dynamic quiz loading and logic)

document.addEventListener("DOMContentLoaded", () => {
  // Get the quizId from the URL query parameter.
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");

  // Quiz Data (Centralized -  All quizzes in one place!)
  const quizData = {
    "networking-1": {
      title: "CCNA Basics",
      questions: [
        {
          question: "What does OSI stand for?",
          options: [
            "Open Systems Interconnection",
            "Operating System Interface",
            "Optical Signal Integration",
            "Online System Interoperability",
          ],
          answer: "Open Systems Interconnection",
        },
        {
          question: "Which layer of the OSI model is responsible for routing?",
          options: [
            "Physical Layer",
            "Data Link Layer",
            "Network Layer",
            "Transport Layer",
          ],
          answer: "Network Layer",
        },
        {
          question: "What is the purpose of a MAC address?",
          options: [
            "Identify a device on a network",
            "Route data between networks",
            "Encrypt data transmissions",
            "Manage network congestion",
          ],
          answer: "Identify a device on a network",
        },
        {
          question: "What is the default subnet mask for a Class C network?",
          options: [
            "255.0.0.0",
            "255.255.0.0",
            "255.255.255.0",
            "255.255.255.255",
          ],
          answer: "255.255.255.0",
        },
        {
          question:
            "Which protocol is used to resolve IP addresses to MAC addresses?",
          options: ["ARP", "DHCP", "DNS", "TCP"],
          answer: "ARP",
        },
        {
          question: "What is the purpose of a router?",
          options: [
            "Connect devices within the same network",
            "Connect different networks together",
            "Provide wireless access",
            "Manage IP addresses",
          ],
          answer: "Connect different networks together",
        },
        {
          question: "What does TCP stand for?",
          options: [
            "Transmission Control Protocol",
            "Transfer Control Protocol",
            "Transport Connection Protocol",
            "Total Control Protocol",
          ],
          answer: "Transmission Control Protocol",
        },
        {
          question: "What is a subnet mask used for?",
          options: [
            "Identify the network and host portions of an IP address",
            "Encrypt network traffic",
            "Assign IP addresses dynamically",
            "Connect to the internet",
          ],
          answer: "Identify the network and host portions of an IP address",
        },
        {
          question: "Which of the following is a valid IPv4 address?",
          options: [
            "192.168.1.256",
            "10.0.0.1",
            "256.256.256.256",
            "172.32.0.1/16",
          ],
          answer: "10.0.0.1",
        },
        {
          question: "What is the purpose of DHCP?",
          options: [
            "Assign IP addresses dynamically",
            "Resolve domain names to IP addresses",
            "Secure network communication",
            "Manage network devices",
          ],
          answer: "Assign IP addresses dynamically",
        },
      ],
    },
    "networking-2": {
      title: "Subnetting Quiz",
      questions: [
        {
          question:
            "You have the network 192.168.1.0/24.  You need to create subnets with at least 25 hosts each.  What subnet mask should you use?",
          options: ["/25", "/26", "/27", "/28"],
          answer: "/27",
        },
        {
          question:
            "Given the IP address 172.16.0.0/16, how many subnets and hosts per subnet are possible?",
          options: [
            "65,536 subnets, 256 hosts",
            "256 subnets, 65,536 hosts",
            "1 subnet, 16,777,216 hosts",
            "Cannot be determined",
          ],
          answer: "256 subnets, 65,536 hosts",
        },
        {
          question: "What is the network address of the host 192.168.1.55/27?",
          options: [
            "192.168.1.0",
            "192.168.1.32",
            "192.168.1.48",
            "192.168.1.64",
          ],
          answer: "192.168.1.32",
        },
        {
          question: "What is the broadcast address of the host 10.0.0.100/26?",
          options: ["10.0.0.63", "10.0.0.127", "10.0.0.255", "10.0.0.64"],
          answer: "10.0.0.63",
        },
        {
          question: "How many usable host addresses are there in a /29 subnet?",
          options: ["8", "6", "14", "30"],
          answer: "6",
        },
        {
          question: "Which of the following is a valid subnet mask?",
          options: [
            "255.255.255.254",
            "255.255.200.0",
            "255.255.255.127",
            "255.0.255.0",
          ],
          answer: "255.255.255.254",
        },
        {
          question: "The IP address 192.168.1.100/28 belongs to which subnet?",
          options: [
            "192.168.1.0",
            "192.168.1.96",
            "192.168.1.64",
            "192.168.1.112",
          ],
          answer: "192.168.1.96",
        },
        {
          question:
            "What is the first usable host address in the subnet 172.16.5.64/26?",
          options: [
            "172.16.5.64",
            "172.16.5.65",
            "172.16.5.127",
            "172.16.5.126",
          ],
          answer: "172.16.5.65",
        },
        {
          question:
            "What is the last usable host address in the subnet 10.1.1.0/24?",
          options: ["10.1.1.0", "10.1.1.1", "10.1.1.254", "10.1.1.255"],
          answer: "10.1.1.254",
        },
        {
          question:
            "You are given the network 10.0.0.0/8 and need 1000 subnets.  What subnet mask will provide the required number of subnets, while maximizing the number of host addresses per subnet?",
          options: ["/18", "/19", "/20", "/21"],
          answer: "/18",
        },
      ],
    },

    "openstack-1": {
      title: "OpenStack Fundamentals",
      questions: [
        {
          question: "What is the primary function of Neutron in OpenStack?",
          options: [
            "Compute resource management",
            "Identity and access management",
            "Networking as a Service (NaaS)",
            "Block storage management",
          ],
          answer: "Networking as a Service (NaaS)",
        },
        {
          question:
            "Which component serves as the main API endpoint for Neutron?",
          options: [
            "neutron-agent",
            "neutron-server",
            "neutron-l3-agent",
            "neutron-dhcp-agent",
          ],
          answer: "neutron-server",
        },
        {
          question:
            "Which technology is most commonly used for asynchronous communication between Neutron components?",
          options: [
            "HTTP/REST",
            "SOAP",
            "RabbitMQ (or another AMQP message queue)",
            "gRPC",
          ],
          answer: "RabbitMQ (or another AMQP message queue)",
        },
        {
          question: "What is the purpose of the ML2 plugin in Neutron?",
          options: [
            "To provide L3 routing services.",
            "To manage DHCP for virtual networks.",
            "To provide a modular framework for supporting various networking technologies.",
            "To collect network telemetry data.",
          ],
          answer:
            "To provide a modular framework for supporting various networking technologies.",
        },
        {
          question: "Which of the following is NOT a type of Neutron plugin?",
          options: [
            "Core Plugin",
            "Service Plugin",
            "Storage Plugin",
            "Mechanism Driver",
          ],
          answer: "Storage Plugin",
        },
        {
          question: "What does Cinder provide in OpenStack?",
          options: [
            "Networking services",
            "Identity services",
            "Block storage services",
            "Object storage services",
          ],
          answer: "Block storage services",
        },
        {
          question:
            "Which OpenStack component is responsible for user authentication and authorization?",
          options: ["Nova", "Keystone", "Glance", "Swift"],
          answer: "Keystone",
        },
        {
          question: "What is the role of Glance in OpenStack?",
          options: [
            "Compute resource management",
            "Image service",
            "Networking service",
            "Object storage service",
          ],
          answer: "Image service",
        },
        {
          question: "What type of storage does Swift provide in OpenStack?",
          options: [
            "Block storage",
            "File storage",
            "Object storage",
            "Ephemeral storage",
          ],
          answer: "Object storage",
        },
        {
          question:
            "Which component is the core of OpenStack's compute service?",
          options: ["Neutron", "Cinder", "Nova", "Swift"],
          answer: "Nova",
        },
      ],
    },

    'openstack-2': {  // This is the quizId for the Nova quiz
        title: 'Nova - Compute',
        questions: [
            { question: "What is the primary function of OpenStack Nova?", options: ["Networking", "Block Storage", "Compute (virtual machine management)", "Object Storage"], answer: "Compute (virtual machine management)" },
            { question: "Which component of Nova is responsible for scheduling virtual machine instances?", options: ["nova-api", "nova-compute", "nova-scheduler", "nova-conductor"], answer: "nova-scheduler" },
            { question: "What is a 'flavor' in OpenStack Nova?", options: ["A type of network.", "A pre-defined set of virtual hardware resources (CPU, RAM, disk).", "A user account.", "An image used to create instances."], answer: "A pre-defined set of virtual hardware resources (CPU, RAM, disk)." },
            { question: "Which command-line tool is commonly used to interact with Nova?", options: ["nova", "cinder", "neutron", "glance"], answer: "nova" },
            { question: "What is an 'instance' in OpenStack Nova?", options: ["A physical server.", "A running virtual machine.", "A network configuration.", "A storage volume."], answer: "A running virtual machine." },
            { question: "What is the role of `nova-compute`?", options: ["Provides the API endpoint for Nova.", "Schedules instance creation.", "Manages the lifecycle of instances on a specific hypervisor.", "Provides a database for Nova."], answer: "Manages the lifecycle of instances on a specific hypervisor." },
            { question: "Which hypervisors are commonly supported by OpenStack Nova?", options: ["KVM", "Xen", "VMware vSphere", "All of the above"], answer: "All of the above" },
            { question: "What is the purpose of a key pair in Nova?", options: ["To encrypt network traffic.", "To provide secure SSH access to instances.", "To manage user accounts.", "To define firewall rules."], answer: "To provide secure SSH access to instances." },
            { question: "What is a 'security group' in the context of Nova?", options: ["A group of users.", "A set of firewall rules that control network access to instances.", "A type of virtual network.", "A method for encrypting data."], answer: "A set of firewall rules that control network access to instances." },
            { question: "What is the difference between an ephemeral disk and a persistent volume?", options: ["Ephemeral disks are faster.", "Ephemeral disks are tied to the instance lifecycle; persistent volumes are not.", "Ephemeral disks are larger.", "Ephemeral disks are stored on object storage."], answer: "Ephemeral disks are tied to the instance lifecycle; persistent volumes are not." },
            { question: "Which Nova component provides a database abstraction layer?", options: ["nova-api", "nova-compute", "nova-scheduler", "nova-conductor"], answer: "nova-conductor" },
            { question: "What is 'live migration' in Nova?", options: ["Moving a running instance from one compute host to another without significant downtime.", "Creating a backup of an instance.", "Resizing an instance.", "Changing the flavor of an instance."], answer: "Moving a running instance from one compute host to another without significant downtime." },
            { question: "What is a 'server group' in Nova?", options: ["A group of users with access to the same servers.", "A group of instances with specific placement policies (e.g., affinity or anti-affinity).", "A group of networks.", "A group of storage volumes."], answer: "A group of instances with specific placement policies (e.g., affinity or anti-affinity)." },
            { question: "What is the purpose of the `nova-api` service?", options: ["To manage the lifecycle of instances.", "To provide the REST API endpoint for Nova.", "To schedule instances.", "To interact with the hypervisor."], answer: "To provide the REST API endpoint for Nova." },
            { question: "Which database does Nova commonly use?", options: ["SQLite", "MongoDB", "MySQL (or PostgreSQL)", "Redis"], answer: "MySQL (or PostgreSQL)" },
            { question: "What is an 'availability zone' in OpenStack?", options: ["A logically isolated section of the cloud, often corresponding to a physical data center or rack.", "A type of network.", "A type of storage.", "A group of users."], answer: "A logically isolated section of the cloud, often corresponding to a physical data center or rack." },
            { question: "What is a 'host aggregate' in Nova?", options: ["A group of compute hosts with shared characteristics (e.g., specific hardware or location).", "A group of instances.", "A group of networks.", "A group of users."], answer: "A group of compute hosts with shared characteristics (e.g., specific hardware or location)." },
            { question: "What is the purpose of the `nova-network` service (deprecated in later OpenStack releases)?", options: ["To provide advanced networking features.", "To manage virtual machine instances.", "To provide basic networking for instances.", "To manage block storage."], answer: "To provide basic networking for instances." },
            { question: "What is the role of a hypervisor in OpenStack?", options: ["To manage user accounts", "To provide networking services", "To run and manage virtual machines", "To provide block storage"], answer: "To run and manage virtual machines" },
            { question: "What does 'overcommit' mean in the context of Nova?", options: ["Allocating more virtual resources (CPU, RAM) than are physically available.", "Creating too many instances.", "Using too much network bandwidth.", "Storing too much data."], answer: "Allocating more virtual resources (CPU, RAM) than are physically available." },
            { question: "What is a 'rescue' operation in Nova?", options: ["Starting an instance in a safe mode to troubleshoot problems.", "Deleting an instance.", "Creating a backup of an instance.", "Migrating an instance."], answer: "Starting an instance in a safe mode to troubleshoot problems." },
            { question: "What is a 'shelved' instance?", options: ["An instance that has been paused.", "An instance that has been stopped and its resources released, but its data is preserved.", "An instance that has been deleted.", "An instance that is being migrated."], answer: "An instance that has been stopped and its resources released, but its data is preserved." },
            { question: "What is the command to list running instances in Nova?", options: ["nova list", "nova show", "nova create", "nova delete"], answer: "nova list" },
            { question: "What is the command to create a new instance in Nova?", options: ["nova list", "nova show", "nova create", "nova delete"], answer: "nova create" },
            { question: "Which file is used to configure the Nova service?", options: ["/etc/nova/nova.conf", "/etc/keystone/keystone.conf", "/etc/glance/glance-api.conf", "/etc/cinder/cinder.conf"], answer: "/etc/nova/nova.conf" },
            { question: "What is the purpose of a 'config drive' in Nova?", options: ["To provide a fast storage option.", "To store the instance's operating system.", "To provide a way to pass configuration data (e.g., user data, metadata) to an instance at boot time.", "To encrypt instance data."], answer: "To provide a way to pass configuration data (e.g., user data, metadata) to an instance at boot time." },
            { question: "What is 'cold migration' (also known as 'resize' or 'migrate')?", options: ["Moving a *running* instance.", "Moving a *stopped* instance to a different compute host, potentially changing its resources.", "Backing up an instance.", "Deleting an instance."], answer: "Moving a *stopped* instance to a different compute host, potentially changing its resources." },
            { question: "What information does `nova show <instance_id>` provide?", options: ["Detailed information about a specific instance, including its status, flavor, IP addresses, etc.", "A list of all instances.", "Information about a specific flavor.", "Information about a specific key pair."], answer: "Detailed information about a specific instance, including its status, flavor, IP addresses, etc." },
            { question: "What is the purpose of `nova-consoleauth`?", options: ["To authenticate users for the Nova API", "To provide console access to instances (VNC, SPICE, etc.)", "To schedule instances", "To manage network connections"], answer: "To provide console access to instances (VNC, SPICE, etc.)"},
           { question: "Which of the following is NOT a valid instance state in Nova?", options: ["ACTIVE", "BUILDING", "SHUTOFF", "RUNNING"], answer: "RUNNING" },

        ]
    },



    "openstack-3": {
      title: "Neutron Networking",
      questions: [
        {
          question: "What is a Neutron provider network?",
          options: [
            "A network created by an administrator that maps directly to a physical network.",
            "A network created by a tenant user.",
            "A network that provides self-service IPAM.",
            "A network isolated using VLANs.",
          ],
          answer:
            "A network created by an administrator that maps directly to a physical network.",
        },
        {
          question:
            "Which Neutron component is responsible for providing L3 routing services?",
          options: [
            "neutron-server",
            "neutron-dhcp-agent",
            "neutron-l3-agent",
            "neutron-metadata-agent",
          ],
          answer: "neutron-l3-agent",
        },
        {
          question: "What is the function of a Neutron router?",
          options: [
            "To connect different tenant networks together.",
            "To provide DHCP services.",
            "To manage security groups.",
            "To provide metadata to instances.",
          ],
          answer: "To connect different tenant networks together.",
        },
        {
          question: "What is a security group in Neutron?",
          options: [
            "A collection of firewall rules that control network traffic to instances.",
            "A group of users with specific access privileges.",
            "A group of networks connected together.",
            "A mechanism for encrypting network traffic.",
          ],
          answer:
            "A collection of firewall rules that control network traffic to instances.",
        },
        {
          question: "Which of the following is a valid Neutron network type?",
          options: ["Local", "Flat", "VLAN", "All of the above"],
          answer: "All of the above",
        },
        {
          question: "What is the purpose of a floating IP address in Neutron?",
          options: [
            "To provide a static IP address to an instance.",
            "To provide a publicly accessible IP address to an instance.",
            "To provide a temporary IP address to an instance.",
            "To provide an IP address for internal communication between instances.",
          ],
          answer: "To provide a publicly accessible IP address to an instance.",
        },
        {
          question: "Which command is used to create a Neutron network?",
          options: [
            "neutron net-create",
            "nova net-create",
            "cinder net-create",
            "glance net-create",
          ],
          answer: "neutron net-create",
        },
        {
          question: "What is the role of the neutron-dhcp-agent?",
          options: [
            "To provide L3 routing.",
            "To manage security groups.",
            "To provide DHCP services to tenant networks.",
            "To provide metadata to instances.",
          ],
          answer: "To provide DHCP services to tenant networks.",
        },
        {
          question:
            "Which of the following is NOT a typical component of a Neutron deployment?",
          options: [
            "neutron-server",
            "neutron-l3-agent",
            "neutron-dhcp-agent",
            "neutron-storage-agent",
          ],
          answer: "neutron-storage-agent",
        },
        {
          question: "What is the purpose of the Metadata Agent?",
          options: [
            "Provides configuration information to instances",
            "provides storage",
            "provides floating IPs",
            "provides DHCP",
          ],
          answer: "Provides configuration information to instances",
        },
      ],
    },

    'openstack-4': { // quizId for the Cinder quiz
        title: 'Cinder - Block Storage',
        questions: [
            { question: "What is the primary function of OpenStack Cinder?", options: ["Networking", "Compute", "Block Storage (providing persistent volumes)", "Object Storage"], answer: "Block Storage (providing persistent volumes)" },
            { question: "Which component of Cinder is responsible for managing volume operations?", options: ["cinder-api", "cinder-volume", "cinder-scheduler", "cinder-backup"], answer: "cinder-volume" },
            { question: "What is a 'volume' in OpenStack Cinder?", options: ["A virtual machine instance.", "A network configuration.", "A detachable block storage device that can be attached to instances.", "A user account."], answer: "A detachable block storage device that can be attached to instances." },
            { question: "Which command-line tool is commonly used to interact with Cinder?", options: ["nova", "cinder", "neutron", "glance"], answer: "cinder" },
            { question: "What is a 'snapshot' in Cinder?", options: ["A running virtual machine.", "A point-in-time copy of a volume.", "A network configuration.", "A user account."], answer: "A point-in-time copy of a volume." },
            { question: "What is the role of `cinder-api`?", options: ["Manages volume operations.", "Provides the REST API endpoint for Cinder.", "Schedules volume creation.", "Creates backups of volumes."], answer: "Provides the REST API endpoint for Cinder." },
            { question: "Which storage backends are commonly supported by OpenStack Cinder?", options: ["LVM", "NFS", "Ceph", "All of the above"], answer: "All of the above" },
            { question: "What is the purpose of a 'volume type' in Cinder?", options: ["To define the size of a volume.", "To define the performance characteristics and features of a volume (e.g., SSD vs. HDD, encryption).", "To define the availability zone of a volume.", "To define the user who owns a volume."], answer: "To define the performance characteristics and features of a volume (e.g., SSD vs. HDD, encryption)." },
            { question: "What is the difference between a volume and an image?", options: ["A volume is a running instance; an image is a template.", "A volume is a block storage device; an image is a file used to create instances or volumes.", "A volume is larger than an image.", "Volumes are encrypted; images are not."], answer: "A volume is a block storage device; an image is a file used to create instances or volumes." },
            { question: "Can a Cinder volume be attached to multiple instances simultaneously?", options: ["Yes, always.", "No, only to one instance at a time (in most cases).", "Yes, but only if they are in the same availability zone.", "Yes, but only if they use the same volume type."], answer: "No, only to one instance at a time (in most cases)." },
            { question: "Which Cinder component is responsible for choosing the appropriate storage backend for a volume?", options: ["cinder-api", "cinder-volume", "cinder-scheduler", "cinder-backup"], answer: "cinder-scheduler" },
            { question: "What is 'volume migration' in Cinder?", options: ["Moving a volume from one compute host to another.", "Moving a volume from one storage backend to another.", "Creating a backup of a volume.", "Deleting a volume."], answer: "Moving a volume from one storage backend to another." },
            { question: "What is a 'volume group' in Cinder?", options: ["A group of users with access to the same volumes.", "A group of volumes that can be managed as a single unit (e.g., for consistent snapshots).", "A group of instances.", "A group of networks."], answer: "A group of volumes that can be managed as a single unit (e.g., for consistent snapshots)." },
            { question: "What is the purpose of the `cinder-backup` service?", options: ["To manage volume operations.", "To provide the REST API endpoint for Cinder.", "To schedule volume creation.", "To create and manage backups of volumes."], answer: "To create and manage backups of volumes." },
            { question: "Which database does Cinder commonly use?", options: ["SQLite", "MongoDB", "MySQL (or PostgreSQL)", "Redis"], answer: "MySQL (or PostgreSQL)" },
            { question: "What is an 'availability zone' in the context of Cinder?", options: ["A logically isolated section of the cloud, often corresponding to a physical data center or rack.", "A type of network.", "A type of instance.", "A group of users."], answer: "A logically isolated section of the cloud, often corresponding to a physical data center or rack." },
            { question: "What is 'QoS' (Quality of Service) in the context of Cinder?", options: ["A way to define performance limits and guarantees for volumes (e.g., IOPS, throughput).", "A way to define the size of a volume.", "A way to define the availability zone of a volume.", "A way to define the user who owns a volume."], answer: "A way to define performance limits and guarantees for volumes (e.g., IOPS, throughput)." },
			{ question: "What is the role of a storage backend driver in OpenStack Cinder?", options: ["Provide API", "Manage images","Interface with specific storage", "Manage networks"], answer: "Interface with specific storage" },
            { question: "What is the command to list volumes in Cinder?", options: ["cinder list", "cinder show", "cinder create", "cinder delete"], answer: "cinder list" },
            { question: "What is the command to create a new volume in Cinder?", options: ["cinder list", "cinder show", "cinder create", "cinder delete"], answer: "cinder create" },
            { question: "Which file is used to configure the Cinder service?", options: ["/etc/nova/nova.conf", "/etc/keystone/keystone.conf", "/etc/glance/glance-api.conf", "/etc/cinder/cinder.conf"], answer: "/etc/cinder/cinder.conf" },
            { question: "What is the purpose of 'volume retyping' in Cinder?", options: ["To change the size of a volume.", "To change the availability zone of a volume.", "To change the volume type of a volume (e.g., from HDD to SSD).", "To change the name of a volume."], answer: "To change the volume type of a volume (e.g., from HDD to SSD)." },
            { question: "What is the command to create a snapshot of a volume?", options: ["cinder snapshot-create", "cinder create-snapshot", "cinder volume-snapshot", "cinder snapshot-list"], answer: "cinder snapshot-create" },
            { question: "Can you create a volume from a snapshot?", options: ["Yes", "No", "Only if the snapshot is encrypted", "Only if the snapshot is of a specific type"], answer: "Yes" },
            { question: "What is 'volume cloning' in Cinder?", options: ["Creating a copy of a volume.", "Deleting a volume.", "Attaching a volume to an instance.", "Creating a snapshot of a volume."], answer: "Creating a copy of a volume." },
            { question: "What is the command to attach a volume to an instance?", options: ["cinder attach", "nova attach-volume", "cinder volume-attach", "nova volume-attach"], answer: "nova volume-attach" }, // Corrected command
            { question: "What is the command to detach a volume from an instance?", options: ["cinder detach", "nova detach-volume", "cinder volume-detach", "nova volume-detach"], answer: "nova volume-detach" }, // Corrected command
             { question: "What information does `cinder show <volume_id>` provide?", options: ["Detailed information about a specific volume.", "List of all volumes", "Volume types", "Backups information"], answer: "Detailed information about a specific volume." },
             { question: "Which of the following is a valid Cinder volume status?", options: ["available", "in-use", "error", "All of the above"], answer: "All of the above" },
            { question: "What is the difference between `cinder-backup` and a volume snapshot?", options: ["Snapshots are faster.", "Backups can be stored in a different storage backend (e.g., object storage) for disaster recovery; snapshots are typically stored on the same backend as the volume.", "`cinder-backup` is deprecated.", "There is no difference."], answer: "Backups can be stored in a different storage backend (e.g., object storage) for disaster recovery; snapshots are typically stored on the same backend as the volume." },
        ]
    },

    'openstack-5': { // quizId for the Swift quiz
    title: 'Swift - Object Storage',
    questions: [
        { question: "What is the primary function of OpenStack Swift?", options: ["Block Storage", "Compute", "Networking", "Object Storage (storing and retrieving unstructured data)"], answer: "Object Storage (storing and retrieving unstructured data)" },
        { question: "What is a 'container' in OpenStack Swift?", options: ["A virtual machine.", "A network configuration.", "A storage compartment for objects, similar to a folder or directory.", "A user account."], answer: "A storage compartment for objects, similar to a folder or directory." },
        { question: "What is an 'object' in OpenStack Swift?", options: ["A running virtual machine.", "A network configuration.", "A piece of data (e.g., a file) stored in Swift.", "A user account."], answer: "A piece of data (e.g., a file) stored in Swift." },
        { question: "Which command-line tool is commonly used to interact with Swift?", options: ["swift", "cinder", "nova", "glance"], answer: "swift" },
        { question: "Is Swift suitable for storing operating system boot images?", options: ["Yes", "No, it's designed for unstructured data, not bootable images.", "Only if the images are small.", "Only if the images are compressed."], answer: "No, it's designed for unstructured data, not bootable images." },
        { question: "How is data redundancy typically achieved in OpenStack Swift?", options: ["By using RAID.", "By replicating objects across multiple storage nodes and zones.", "By creating backups.", "By using snapshots."], answer: "By replicating objects across multiple storage nodes and zones." },
        { question: "What is the 'account' level in the Swift hierarchy?", options: ["The top-level namespace, representing a user or tenant.", "A container for objects.", "An individual object.", "A virtual machine instance."], answer: "The top-level namespace, representing a user or tenant." },
        { question: "What are the three main components of a typical Swift deployment?", options: ["Proxy Server, Account Server, Container Server, Object Server", "API Server, Scheduler, Compute Node", "Neutron Server, Cinder Volume, Glance Image", "Keystone Server, Horizon Dashboard, Swift Client"], answer: "Proxy Server, Account Server, Container Server, Object Server" },
        { question: "What is the role of the Swift Proxy Server?", options: ["To store object data.", "To manage user accounts.", "To provide the API endpoint and handle requests, routing them to the appropriate storage nodes.", "To provide block storage."], answer: "To provide the API endpoint and handle requests, routing them to the appropriate storage nodes." },
        { question: "What is eventual consistency in the context of Swift?", options: ["Data is immediately consistent across all replicas.", "Data updates may take some time to propagate to all replicas, but will eventually be consistent.", "Data is never consistent.", "Data is only consistent within a single availability zone."], answer: "Data updates may take some time to propagate to all replicas, but will eventually be consistent." },
        { question: "Which HTTP methods are commonly used with the Swift API?", options: ["GET, POST, PUT, DELETE", "SELECT, INSERT, UPDATE, DELETE", "CREATE, READ, UPDATE, DELETE", "CONNECT, DISCONNECT, SEND, RECEIVE"], answer: "GET, POST, PUT, DELETE" },
        { question: "What is 'large object support' in Swift?", options: ["The ability to store very large files by splitting them into segments.", "The ability to store a large number of small files.", "The ability to store encrypted data.", "The ability to store compressed data."], answer: "The ability to store very large files by splitting them into segments." },
        { question: "What is a 'pseudo-hierarchical folder' in Swift?", options: ["A real folder on the filesystem.", "A way to simulate folder-like structures within a container using object naming conventions.", "A folder that is only visible to administrators.", "A folder that is automatically deleted after a certain time."], answer: "A way to simulate folder-like structures within a container using object naming conventions." },
        { question: "What is 'static web hosting' in Swift?", options: ["The ability to host dynamic websites.", "The ability to serve static website content (HTML, CSS, JavaScript, images) directly from Swift containers.", "The ability to run web servers within Swift.", "The ability to create virtual machines for web hosting."], answer: "The ability to serve static website content (HTML, CSS, JavaScript, images) directly from Swift containers." },
        { question: "What is 'TempURL' in Swift?", options: ["A temporary password.", "A temporary URL that provides time-limited, signed access to an object without requiring authentication credentials.", "A temporary storage location.", "A temporary network connection."], answer: "A temporary URL that provides time-limited, signed access to an object without requiring authentication credentials." },
        { question: "Can you store metadata with objects in Swift?", options: ["Yes, you can store custom key-value pairs as object metadata.", "No, metadata is not supported.", "Only system-defined metadata is allowed.", "Metadata is only stored at the container level."], answer: "Yes, you can store custom key-value pairs as object metadata." },
        { question: "What is 'versioning' in Swift?", options: ["The ability to track changes to Swift's code.", "The ability to store multiple versions of an object, allowing retrieval of older versions.", "The ability to use different versions of the Swift API.", "The ability to manage user account versions."], answer: "The ability to store multiple versions of an object, allowing retrieval of older versions." },
        { question: "What is 'bulk delete' in Swift?", options: ["Deleting a single object.", "Deleting multiple objects in a single request.", "Deleting an entire container.", "Deleting an entire account."], answer: "Deleting multiple objects in a single request." },
        { question: "What is the command to list containers in Swift?", options: ["swift list", "swift show", "swift upload", "swift download"], answer: "swift list" },
        { question: "What is the command to upload an object to Swift?", options: ["swift list", "swift show", "swift upload", "swift download"], answer: "swift upload" },
        { question: "Which file is used to configure the Swift service?", options: ["/etc/swift/swift.conf", "/etc/nova/nova.conf", "/etc/cinder/cinder.conf", "/etc/glance/glance-api.conf"], answer: "/etc/swift/swift.conf" },
        { question: "What is a 'ring' in Swift?", options: ["A data structure that maps object names to storage locations (devices).", "A security group.", "A network configuration.", "A type of virtual machine."], answer: "A data structure that maps object names to storage locations (devices)." },
        { question: "What is 'cross-domain request' (CORS) support in Swift?", options: ["The ability to access Swift from different domains in a web browser.", "The ability to encrypt data.", "The ability to compress data.", "The ability to migrate data."], answer: "The ability to access Swift from different domains in a web browser." },
        { question: "What is the command to download an object from Swift?", options: ["swift list", "swift show", "swift upload", "swift download"], answer: "swift download" },
        { question: "Can you set access control lists (ACLs) on containers in Swift?", options: ["Yes", "No", "Only on objects", "Only on accounts"], answer: "Yes" },
        { question: "What is a 'slo' (Static Large Object) in Swift?", options: ["It allows to upload big files as segments", "Slow network", "Storage location object", "A small file"], answer: "It allows to upload big files as segments" },
        { question: "What is a 'dlo' (Dynamic Large Object) in Swift?", options: ["It allows to upload big files as segments", "Slow network", "Storage location object", "A small file"], answer: "It allows to upload big files as segments" },
        { question: "What is the main difference between SLO and DLO in Swift", options: ["SLO uses a static manifest file; DLO generates the manifest dynamically", "DLO is faster", "SLO is faster", "No differences"], answer: "SLO uses a static manifest file; DLO generates the manifest dynamically" },
        { question: "What is a 'replication' in Swift?", options: ["Copying data to other nodes to provide redundancy", "Backup of data", "Migrate data", "Access data"], answer: "Copying data to other nodes to provide redundancy" },
        { question: "What is a common use case for Swift?", options: ["Storing backups and archives", "Storing media files (images, videos)", "Serving static web content", "All of the above"], answer: "All of the above" },
    ]
},

'openstack-6': { // quizId for the Keystone quiz
    title: 'Keystone - Identity Service',
    questions: [
        { question: "What is the primary function of OpenStack Keystone?", options: ["Networking", "Block Storage", "Compute", "Identity and Access Management (authentication and authorization)"], answer: "Identity and Access Management (authentication and authorization)" },
        { question: "What is a 'user' in Keystone?", options: ["A virtual machine.", "A network configuration.", "An individual or system that needs to access OpenStack resources.", "A storage volume."], answer: "An individual or system that needs to access OpenStack resources." },
        { question: "What is a 'project' (or 'tenant') in Keystone?", options: ["A collection of users, groups, and roles.", "A virtual machine.", "A network configuration.", "A storage volume."], answer: "A collection of users, groups, and roles." },
        { question: "What is a 'role' in Keystone?", options: ["A set of permissions that define what actions a user can perform on resources.", "A virtual machine.", "A network configuration.", "A storage volume."], answer: "A set of permissions that define what actions a user can perform on resources." },
        { question: "What is an 'endpoint' in Keystone?", options: ["A URL that represents the location of an OpenStack service.", "A virtual machine.", "A user account.", "A storage volume."], answer: "A URL that represents the location of an OpenStack service." },
        { question: "Which command-line tool is commonly used to interact with Keystone?", options: ["keystone", "cinder", "nova", "glance"], answer: "keystone" },
        { question: "What is the 'service catalog' in Keystone?", options: ["A list of available OpenStack services and their endpoints.", "A list of users.", "A list of projects.", "A list of roles."], answer: "A list of available OpenStack services and their endpoints." },
        { question: "What is 'token-based authentication' in Keystone?", options: ["Using a username and password.", "Using a temporary token to access resources after initial authentication.", "Using a physical security key.", "Using biometric authentication."], answer: "Using a temporary token to access resources after initial authentication." },
        { question: "Which database does Keystone commonly use?", options: ["SQLite", "MongoDB", "MySQL (or PostgreSQL)", "Redis"], answer: "MySQL (or PostgreSQL)" },
        { question: "What is the purpose of the `keystone-manage` command?", options: ["To manage user accounts.", "To manage projects.", "To perform administrative tasks like database migrations and bootstrapping.", "To manage roles."], answer: "To perform administrative tasks like database migrations and bootstrapping." },
        { question: "What is a 'domain' in Keystone (introduced in later versions)?", options: ["A top-level container for projects, users, and groups, providing multi-tenancy isolation.", "A virtual machine.", "A network configuration.", "A storage volume."], answer: "A top-level container for projects, users, and groups, providing multi-tenancy isolation." },
        { question: "What is 'federated identity' in Keystone?", options: ["The ability to use credentials from external identity providers (like LDAP or SAML) to access OpenStack.", "The ability to create multiple user accounts.", "The ability to manage multiple projects.", "The ability to create custom roles."], answer: "The ability to use credentials from external identity providers (like LDAP or SAML) to access OpenStack." },
        { question: "Which file is used to configure the Keystone service?", options: ["/etc/keystone/keystone.conf", "/etc/nova/nova.conf", "/etc/cinder/cinder.conf", "/etc/glance/glance-api.conf"], answer: "/etc/keystone/keystone.conf" },
        { question: "What is the command to list users in Keystone?", options: ["keystone user-list", "keystone user-show", "keystone user-create", "keystone user-delete"], answer: "keystone user-list" },
        { question: "What is the command to create a new user in Keystone?", options: ["keystone user-list", "keystone user-show", "keystone user-create", "keystone user-delete"], answer: "keystone user-create" },
        { question: "What is the command to list projects in Keystone?", options: ["keystone project-list", "keystone project-show", "keystone project-create", "keystone project-delete"], answer: "keystone project-list" },
        { question: "What is the command to create a new project in Keystone?", options: ["keystone project-list", "keystone project-show", "keystone project-create", "keystone project-delete"], answer: "keystone project-create" },
        { question: "What is the command to list roles in Keystone?", options: ["keystone role-list", "keystone role-show", "keystone role-create", "keystone role-delete"], answer: "keystone role-list" },
        { question: "What is the command to create a new role in Keystone?", options: ["keystone role-list", "keystone role-show", "keystone role-create", "keystone role-delete"], answer: "keystone role-create" },
        { question: "What is the command to assign a role to a user on a project?", options: ["keystone role-assignment-create", "keystone user-role-add", "openstack role add", "keystone add-role"], answer: "openstack role add" },
        { question: "What is the `admin` role in Keystone?", options: ["A role with full administrative privileges.", "A role with limited privileges.", "A role for read-only access.", "A role for accessing the dashboard."], answer: "A role with full administrative privileges." },
        { question: "What is 'Fernet' in the context of Keystone?", options: ["A type of database.", "A type of token format that is more secure and scalable than UUID tokens.", "A type of network configuration.", "A type of virtual machine."], answer: "A type of token format that is more secure and scalable than UUID tokens." },
		{ question: "What does the `openstack` command-line client use to authenticate with Keystone?", options: ["Username and password directly.", "A token obtained from Keystone.", "An API key.", "A certificate."], answer: "A token obtained from Keystone." },
        { question: "What is a 'group' in Keystone?", options: ["A collection of users.", "A set of permissions", "A network configuration.", "Instances grouped"], answer: "A collection of users." },
		{ question: "How does Keystone integrate with other OpenStack services?", options: ["Through a shared database", "Through message queues.", "By providing authentication and authorization services, and a service catalog.", "It doesn't integrate with other services."], answer: "By providing authentication and authorization services, and a service catalog." },
        { question: "What is the purpose of the `keystone-wsgi-admin` and `keystone-wsgi-public` services?", options: ["To provide different API endpoints for administrative and public access, respectively.", "To manage user accounts.", "To manage projects.", "To manage roles."], answer: "To provide different API endpoints for administrative and public access, respectively." },
		{ question: "Which Identity API version is recommended for use?", options: ["v2.0 (deprecated)", "v3", "v1", "v4"], answer: "v3" },
		{ question: "What is the primary protocol used for communication with the Keystone API?", options: ["HTTP/REST", "SOAP", "RPC", "SSH"], answer: "HTTP/REST" },
        { question: "Does Keystone support multi-factor authentication (MFA)?", options: ["Yes, through plugins and extensions.", "No, it only supports username/password.", "Only for the admin user.", "Only with federated identity."], answer: "Yes, through plugins and extensions." },
        { question: "Can Keystone manage quotas for resources?", options: [" No, quota management is handled by individual services.", "Yes", "only for users", "only by projects"], answer: " No, quota management is handled by individual services." },

    ]
},

'openstack-7': { // quizId for the Glance quiz
    title: 'Glance - Image Service',
    questions: [
        { question: "What is the primary function of OpenStack Glance?", options: ["Networking", "Block Storage", "Compute", "Image Service (managing virtual machine images)"], answer: "Image Service (managing virtual machine images)" },
        { question: "What is an 'image' in OpenStack Glance?", options: ["A running virtual machine.", "A network configuration.", "A template or snapshot used to create virtual machine instances.", "A user account."], answer: "A template or snapshot used to create virtual machine instances." },
        { question: "Which command-line tool is commonly used to interact with Glance?", options: ["glance", "cinder", "nova", "keystone"], answer: "glance" },
        { question: "What are the common image formats supported by Glance?", options: ["raw, qcow2, vmdk, iso", "txt, pdf, doc", "mp3, wav, flac", "exe, dmg, apk"], answer: "raw, qcow2, vmdk, iso" },
        { question: "What is the role of `glance-api`?", options: ["Manages image storage.", "Provides the REST API endpoint for Glance.", "Schedules image creation.", "Performs image conversion."], answer: "Provides the REST API endpoint for Glance." },
        { question: "What is the role of `glance-registry` (deprecated in later versions)?", options: ["Manages image storage.", "Provided a database for image metadata.", "Scheduled image creation.", "Performed image conversion."], answer: "Provided a database for image metadata." },
        { question: "Which storage backends are commonly supported by Glance?", options: ["File system, Swift, Ceph, HTTP", "LVM", "NFS", "iSCSI"], answer: "File system, Swift, Ceph, HTTP" },
        { question: "What is 'image visibility' in Glance?", options: ["How large an image is.", "Whether an image is public, private, shared, or community.", "The format of an image.", "The location of an image."], answer: "Whether an image is public, private, shared, or community." },
        { question: "What is the difference between a 'public' image and a 'private' image?", options: ["Public images are larger.", "Public images are available to all users; private images are only available to the owner.", "Public images are encrypted; private images are not.", "Public images are stored on faster storage."], answer: "Public images are available to all users; private images are only available to the owner." },
        { question: "Can you upload images to Glance?", options: ["Yes", "No", "Only small images.", "Only compressed images."], answer: "Yes" },
        { question: "Can you download images from Glance?", options: ["Yes", "No", "Only public images.", "Only private images."], answer: "Yes" },
        { question: "Can you delete images from Glance?", options: ["Yes", "No", "Only public images.", "Only private images."], answer: "Yes" },
       { question: "What is 'image conversion' in Glance?", options: ["Changing the size of an image.", "Changing the format of an image (e.g., from raw to qcow2).", "Changing the visibility of an image.", "Changing the name of an image."], answer: "Changing the format of an image (e.g., from raw to qcow2)." },
        { question: "What is 'image caching' in Glance?", options: ["Storing frequently accessed images on a faster storage tier.", "Storing images in a compressed format.", "Encrypting images.", "Backing up images."], answer: "Storing frequently accessed images on a faster storage tier." },
        { question: "Which database does Glance commonly use?", options: ["SQLite", "MongoDB", "MySQL (or PostgreSQL)", "Redis"], answer: "MySQL (or PostgreSQL)" },
        { question: "What is the command to list images in Glance?", options: ["glance image-list", "glance image-show", "glance image-create", "glance image-delete"], answer: "glance image-list" },
        { question: "What is the command to upload an image to Glance?", options: ["glance image-list", "glance image-show", "glance image-create", "glance image-delete"], answer: "glance image-create" },
        { question: "What is the command to download an image from Glance?", options: ["glance image-download", "glance image-show", "glance image-create", "glance image-delete"], answer: "glance image-download" },
        { question: "What is the command to delete an image from Glance?", options: ["glance image-list", "glance image-show", "glance image-create", "glance image-delete"], answer: "glance image-delete" },
        { question: "Which file is used to configure the Glance service?", options: ["/etc/glance/glance-api.conf", "/etc/nova/nova.conf", "/etc/cinder/cinder.conf", "/etc/keystone/keystone.conf"], answer: "/etc/glance/glance-api.conf" },
        { question: "What is a 'multi-store' configuration in Glance?", options: ["Using multiple databases.", "Using multiple storage backends (e.g., Swift and a local file system).", "Using multiple API endpoints.", "Using multiple image formats."], answer: "Using multiple storage backends (e.g., Swift and a local file system)." },
        { question: "What is the purpose of image properties (metadata) in Glance?", options: ["To define the size of an image.", "To store additional information about an image (e.g., operating system, architecture).", "To define the visibility of an image.", "To define the format of an image."], answer: "To store additional information about an image (e.g., operating system, architecture)." },
        { question: "Can Glance images be encrypted?", options: ["Yes, Glance supports image encryption.", "No, encryption is not supported.", "Only if the backend supports it.", "Only for private images."], answer: "Yes, Glance supports image encryption." },
        { question: "What is 'image signing' in Glance?", options: ["Adding a digital signature to an image to verify its integrity and authenticity.", "Compressing an image.", "Encrypting an image.", "Converting an image."], answer: "Adding a digital signature to an image to verify its integrity and authenticity." },
		{ question: "What is the difference between an image and a snapshot in OpenStack?", options: ["There is no difference.", "An image is a template for creating instances; a snapshot is a point-in-time copy of a running instance or volume.", "An image is a point-in-time copy; a snapshot is a template.", "Images are larger than snapshots."], answer: "An image is a template for creating instances; a snapshot is a point-in-time copy of a running instance or volume." },
        { question: "What is 'image staging' in Glance?", options: ["A temporary storage area for uploading images before they are made available.", "The process of deleting images.", "The process of converting images.", "The process of encrypting images."], answer: "A temporary storage area for uploading images before they are made available." },
		{ question: "What is `direct_url` used for?", options:[" Provides location for direct image import", "URL for API", "URL for OpenStack dashboard", "URL for support"], answer: " Provides location for direct image import" },
        { question: "What is the purpose of `glance-scrubber`?", options: ["Clean up utility", "API for Glance", "Metadata definition", "For image conversion"], answer: "Clean up utility" },
		{ question: "How can you share a private image with another project/tenant in Glance?", options: ["Make the image public.", "Use the `glance member-create` command to add the project as a member of the image.", "Download and re-upload the image.", "You cannot share private images."], answer: "Use the `glance member-create` command to add the project as a member of the image." },
        { question: "Which of the following is NOT a valid image status in Glance?", options: ["active", "queued", "saving", "running"], answer: "running" },
    ]
},

'openstack-8': { // quizId for the Horizon quiz
    title: 'Horizon - Dashboard',
    questions: [
        { question: "What is the primary function of OpenStack Horizon?", options: ["Command-line interface", "REST API", "Web-based graphical user interface (GUI) for managing OpenStack resources", "Database management"], answer: "Web-based graphical user interface (GUI) for managing OpenStack resources" },
        { question: "Which web server is commonly used to serve the Horizon dashboard?", options: ["Apache HTTP Server (with mod_wsgi) or Nginx", "IIS", "Tomcat", "Jetty"], answer: "Apache HTTP Server (with mod_wsgi) or Nginx" },
        { question: "Is Horizon required to use OpenStack?", options: ["Yes, it's the only way to interact with OpenStack.", "No, you can use the command-line tools, SDKs, and APIs directly.", "Yes, but only for administrative tasks.", "No, but it's required for basic operations."], answer: "No, you can use the command-line tools, SDKs, and APIs directly." },
        { question: "Which OpenStack services can you typically manage through Horizon?", options: ["Compute (Nova)", "Networking (Neutron)", "Block Storage (Cinder)", "All of the above"], answer: "All of the above" },
        { question: "Can you launch instances (virtual machines) from Horizon?", options: ["Yes", "No", "Only if you have administrative privileges.", "Only if you have the command-line tools installed."], answer: "Yes" },
        { question: "Can you create and manage networks from Horizon?", options: ["Yes", "No", "Only if you have administrative privileges.", "Only if you have the command-line tools installed."], answer: "Yes" },
        { question: "Can you create and manage volumes from Horizon?", options: ["Yes", "No", "Only if you have administrative privileges.", "Only if you have the command-line tools installed."], answer: "Yes" },
        { question: "Can you manage users and projects from Horizon?", options: ["Yes, if you have administrative privileges.", "No, user and project management is only done through the command line.", "Yes, all users can manage users and projects.", "No, Horizon doesn't interact with Keystone."], answer: "Yes, if you have administrative privileges." },
        { question: "Can you view the service catalog from Horizon?", options: ["Yes", "No", "Only administrators can view the service catalog.", "The service catalog is only accessible through the command line."], answer: "Yes" },
        { question: "What is the 'Overview' panel in Horizon typically used for?", options: ["To display a summary of resource usage and limits.", "To create new instances.", "To manage networks.", "To manage users."], answer: "To display a summary of resource usage and limits." },
        { question: "What is the 'Instances' panel in Horizon used for?", options: ["To manage networks.", "To manage volumes.", "To manage virtual machine instances.", "To manage user accounts."], answer: "To manage virtual machine instances." },
        { question: "What is the 'Networks' panel in Horizon used for?", options: ["To manage instances.", "To manage volumes.", "To manage virtual networks, routers, and security groups.", "To manage user accounts."], answer: "To manage virtual networks, routers, and security groups." },
        { question: "What is the 'Volumes' panel in Horizon used for?", options: ["To manage instances.", "To manage networks.", "To manage block storage volumes.", "To manage user accounts."], answer: "To manage block storage volumes." },
        { question: "What is the 'Images' panel in Horizon used for?", options: ["To manage instances", "To manage block storage", "To browse and manage Glance images", "To manage users"], answer: "To browse and manage Glance images"},
		{ question: "Which file is used to configure the Horizon service?", options: ["/etc/horizon/local_settings.py", "/etc/nova/nova.conf", "/etc/cinder/cinder.conf", "/etc/glance/glance-api.conf"], answer: "/etc/horizon/local_settings.py" },
        { question: "Can you customize the appearance of Horizon?", options: ["Yes, by modifying the CSS and templates.", "No, the appearance is fixed.", "Only by using pre-built themes.", "Only by contacting OpenStack support."], answer: "Yes, by modifying the CSS and templates." },
        { question: "Can you extend Horizon's functionality with plugins?", options: ["Yes, Horizon supports a plugin architecture.", "No, plugins are not supported.", "Only official plugins are allowed.", "Plugins are only for administrative tasks."], answer: "Yes, Horizon supports a plugin architecture." },
        { question: "What is 'django' in the context of Horizon?", options: ["A programming language.", "A web framework written in Python that Horizon is built upon.", "A database.", "An OpenStack service."], answer: "A web framework written in Python that Horizon is built upon." },
        { question: "Can you access the Horizon dashboard from a web browser?", options: ["Yes", "No, you need a special client application.", "Only from within the OpenStack network.", "Only from a specific operating system."], answer: "Yes" },
        { question: "What is the typical URL for accessing the Horizon dashboard?", options: ["http://<your_openstack_ip>/horizon", "http://<your_openstack_ip>/dashboard", "http://<your_openstack_ip>/", "http://<your_openstack_ip>/admin"], answer: "http://<your_openstack_ip>/horizon" },
        { question: "What authentication methods does Horizon support?", options: ["Username/password (via Keystone)", "Token-based authentication", "Federated identity", "All of the above"], answer: "All of the above" },
        { question: "What is the 'Settings' panel in Horizon used for?", options: ["Changing user password", "Set default region", "Change language", "All of the above"], answer: "All of the above" },
		{ question: "Is it possible to create and manage snapshots of instances through Horizon?", options: ["Yes", "No", "Only for certain instance types.", "Only from the command line."], answer: "Yes" },
        { question: "Can you access instance consoles (VNC, SPICE) through Horizon?", options: ["Yes", "No", "Only if you have administrative privileges.", "Only from the command line."], answer: "Yes" },
        { question: "Can you create and manage key pairs through Horizon?", options: ["Yes", "No", "Only if you have administrative privileges.", "Only from the command line."], answer: "Yes" },
        { question: "Can you create and manage floating IP addresses through Horizon?", options: ["Yes", "No", "Only if you have administrative privileges.", "Only from the command line."], answer: "Yes" },
        { question: "Can you create and manage security groups through Horizon?", options: ["Yes", "No", "Only if you have administrative privileges.", "Only from the command line."], answer: "Yes" },
        { question: "Can you view logs for instances and other services through Horizon?", options: ["Yes, for some services and with appropriate configuration.", "No, logs are only accessible from the command line.", "Yes, all logs are available to all users.", "Only administrators can view logs."], answer: "Yes, for some services and with appropriate configuration." },
        { question: "Can you create and manage Heat stacks through Horizon?", options: ["Yes", "No", "Only if you have Heat installed", "Only from command line"], answer: "Yes" },
        { question: "Does Horizon support role-based access control (RBAC)?", options: ["Yes, through integration with Keystone.", "No, all users have the same access.", "Only for administrative users.", "Only for specific services."], answer: "Yes, through integration with Keystone." },
    ]
},

    "openstack-9": {
      title: "Heat Quiz",
      questions: [
        {
          question: "What is the primary purpose of OpenStack Heat?",
          options: [
            "Identity and access management",
            "Block storage management",
            "Orchestration of cloud resources",
            "Networking as a Service",
          ],
          answer: "Orchestration of cloud resources",
        },
        {
          question: "Which file format is commonly used for Heat templates?",
          options: ["JSON", "XML", "YAML", "HTML"],
          answer: "YAML",
        },
        {
          question:
            "What is the main component of Heat that processes templates and manages resources?",
          options: [
            "heat-api",
            "heat-engine",
            "heat-cfn-api",
            "heat-conductor",
          ],
          answer: "heat-engine",
        },
        {
          question:
            "Which section of a Heat template defines the resources to be created?",
          options: ["parameters", "resources", "outputs", "description"],
          answer: "resources",
        },
        {
          question:
            "What is the purpose of the `heat_template_version` key in a Heat template?",
          options: [
            "To specify the version of OpenStack.",
            "To specify the version of the Heat engine.",
            "To specify the version of the HOT template format.",
            "To specify the version of the resource being created.",
          ],
          answer: "To specify the version of the HOT template format.",
        },
        {
          question:
            "Which intrinsic function is used to retrieve the value of an input parameter?",
          options: ["get_resource", "get_attr", "get_param", "list_join"],
          answer: "get_param",
        },
        {
          question: 'What is a "stack" in the context of Heat?',
          options: [
            "A collection of Heat templates.",
            "A collection of OpenStack services.",
            "A collection of resources managed as a single unit.",
            "A type of OpenStack resource.",
          ],
          answer: "A collection of resources managed as a single unit.",
        },
        {
          question:
            "Which resource type is used to create a Nova compute instance?",
          options: [
            "OS::Neutron::Net",
            "OS::Cinder::Volume",
            "OS::Nova::Server",
            "OS::Glance::Image",
          ],
          answer: "OS::Nova::Server",
        },
        {
          question:
            "What is the purpose of the `depends_on` property in a resource definition?",
          options: [
            "To specify the resource type.",
            "To specify the order in which resources should be created.",
            "To specify input parameters for the resource.",
            "To specify output values for the resource.",
          ],
          answer: "To specify the order in which resources should be created.",
        },
        {
          question:
            "Which command is used to create a new stack from a Heat template?",
          options: [
            "openstack server create",
            "openstack network create",
            "openstack stack create",
            "openstack volume create",
          ],
          answer: "openstack stack create",
        },
        {
          question:
            "What is the purpose of the `outputs` section in a Heat template?",
          options: [
            "To define input parameters.",
            "To define resources.",
            "To define values that will be returned by the stack.",
            "To define dependencies between resources.",
          ],
          answer: "To define values that will be returned by the stack.",
        },
        {
          question:
            "Which Heat component provides an AWS CloudFormation-compatible API?",
          options: [
            "heat-api",
            "heat-engine",
            "heat-api-cfn",
            "heat-conductor",
          ],
          answer: "heat-api-cfn",
        },
        {
          question: "What is the role of resource plugins in Heat?",
          options: [
            "To parse Heat templates",
            "To store stack state",
            "To implement the logic for creating, updating and deleting specific resource types.",
            "To provide the RESTful API",
          ],
          answer:
            "To implement the logic for creating, updating and deleting specific resource types.",
        },
        {
          question:
            "Which database is commonly used by Heat to store stack information?",
          options: ["SQLite", "MongoDB", "MySQL (or PostgreSQL)", "Redis"],
          answer: "MySQL (or PostgreSQL)",
        },
        {
          question: "What is the purpose of an environment file in Heat?",
          options: [
            "To define the Heat template.",
            "To provide values for input parameters and override defaults.",
            "To define the resources in a stack.",
            "To define the outputs of a stack.",
          ],
          answer:
            "To provide values for input parameters and override defaults.",
        },
        {
          question:
            "What is the typical status of a stack that has been successfully created?",
          options: [
            "CREATE_IN_PROGRESS",
            "CREATE_FAILED",
            "CREATE_COMPLETE",
            "UPDATE_IN_PROGRESS",
          ],
          answer: "CREATE_COMPLETE",
        },
        {
          question:
            "Which intrinsic function is used to retrieve an attribute of a resource?",
          options: ["get_param", "get_resource", "get_attr", "list_join"],
          answer: "get_attr",
        },
        {
          question: 'What is a "nested stack" in Heat?',
          options: [
            "A stack that is defined within another stack's template.",
            "A stack that has failed to create.",
            "A stack that has been deleted.",
            "A stack that is running on a nested virtualization environment.",
          ],
          answer: "A stack that is defined within another stack's template.",
        },
        {
          question:
            "Which resource type can be used to manage software configurations on instances?",
          options: [
            "OS::Nova::Server",
            "OS::Neutron::Net",
            "OS::Heat::SoftwareConfig",
            "OS::Cinder::Volume",
          ],
          answer: "OS::Heat::SoftwareConfig",
        },
        {
          question: 'What is "idempotency" in the context of Heat?',
          options: [
            "The ability to create stacks quickly.",
            "The ability to create the exact same result by applying the same template.",
            "The ability to create stacks from any template format.",
            "The ability to create stacks across multiple clouds.",
          ],
          answer:
            "The ability to create the exact same result by applying the same template.",
        },
        {
          question: "Which command lists all the stacks managed by Heat?",
          options: [
            "heat stack-show",
            "heat resource-list",
            "heat stack-list",
            "heat template-show",
          ],
          answer: "heat stack-list",
        },
        {
          question:
            "Which command shows the details of a specific stack, including its status and outputs?",
          options: [
            "heat stack-list",
            "heat stack-show",
            "heat resource-list",
            "heat event-list",
          ],
          answer: "heat stack-show",
        },
        {
          question:
            "What is the function of `get_resource` in a Heat template?",
          options: [
            "To retrieves the value of parameter.",
            "To retrieves the resource definition.",
            "To retrieve attributes of a resource.",
            "To creates a new resource.",
          ],
          answer: "To retrieves the resource definition.",
        },
        {
          question:
            "What data type is commonly used for the `size` property of an `OS::Cinder::Volume` resource?",
          options: ["String", "Number", "Boolean", "List"],
          answer: "Number",
        },
        {
          question: "Which of the following is a valid Heat template version?",
          options: [
            "2012-12-12",
            "2015-04-30",
            "2021-04-16",
            "All of the above",
          ],
          answer: "All of the above",
        },
        {
          question:
            "What is the purpose of the `constraints` section within a parameter definition?",
          options: [
            "To define default value.",
            "To restrict the allowed values for the parameter.",
            "To make the parameter required.",
            "To hide the parameter from user.",
          ],
          answer: "To restrict the allowed values for the parameter.",
        },
        {
          question: "Which of the following is NOT a typical stack status?",
          options: [
            "UPDATE_COMPLETE",
            "DELETE_FAILED",
            "RESOURCE_READY",
            "CREATE_IN_PROGRESS",
          ],
          answer: "RESOURCE_READY",
        },
        {
          question:
            "Can Heat manage resources across multiple availability zones?",
          options: [
            "Yes",
            "No",
            "Only with nested stacks",
            "Only with custom resource types",
          ],
          answer: "Yes",
        },
        {
          question:
            "What is the primary communication method between `heat-api` and `heat-engine`?",
          options: [
            "Direct function calls",
            "Shared memory",
            "REST API calls",
            "Message queue (RPC)",
          ],
          answer: "Message queue (RPC)",
        },
        {
          question: "Which file is used to configure the Heat service?",
          options: [
            "/etc/nova/nova.conf",
            "/etc/heat/heat.conf",
            "/etc/cinder/cinder.conf",
            "/etc/keystone/keystone.conf",
          ],
          answer: "/etc/heat/heat.conf",
        },
      ],
    },

    "security-1": {
      title: "Basic Security Concepts",
      questions: [
        {
          question: "What is the CIA triad?",
          options: [
            "Confidentiality, Integrity, Availability",
            "Cryptography, Intrusion detection, Access control",
            "Compliance, Investigation, Auditing",
            "Certification, Implementation, Authorization",
          ],
          answer: "Confidentiality, Integrity, Availability",
        },
        {
          question: "What is the principle of least privilege?",
          options: [
            "Granting users the minimum level of access necessary to perform their job functions",
            "Giving all users full administrative rights",
            "Allowing users to access any resource they request",
            "Providing users with temporary access to sensitive data",
          ],
          answer:
            "Granting users the minimum level of access necessary to perform their job functions",
        },
        {
          question: "What is a firewall?",
          options: [
            "A hardware or software device that controls network traffic based on a set of rules",
            "A system for detecting and preventing intrusions",
            "A method for encrypting data",
            "A tool for managing user accounts",
          ],
          answer:
            "A hardware or software device that controls network traffic based on a set of rules",
        },
        {
          question: "What is a VPN?",
          options: [
            "Virtual Private Network",
            "Very Powerful Network",
            "Virtual Public Network",
            "Verified Protected Network",
          ],
          answer: "Virtual Private Network",
        },
        {
          question: "What is encryption?",
          options: [
            "The process of converting data into a format that can only be read by authorized users",
            "The process of hiding data from unauthorized users",
            "The process of verifying the identity of a user",
            "The process of backing up data",
          ],
          answer:
            "The process of converting data into a format that can only be read by authorized users",
        },
        {
          question: "What is multi-factor authentication?",
          options: [
            "Using multiple passwords to access a system",
            "Using a combination of two or more authentication factors, such as something you know, something you have, and something you are",
            "Using a biometric authentication method",
            "Using a single, strong password",
          ],
          answer:
            "Using a combination of two or more authentication factors, such as something you know, something you have, and something you are",
        },
        {
          question: "What is social engineering?",
          options: [
            "Manipulating people into divulging confidential information or performing actions that compromise security",
            "Using technical skills to hack into a system",
            "Developing secure software",
            "Managing network security",
          ],
          answer:
            "Manipulating people into divulging confidential information or performing actions that compromise security",
        },
        {
          question: "What is a phishing attack?",
          options: [
            "A type of social engineering attack where an attacker impersonates a legitimate entity to trick users into providing sensitive information",
            "A type of malware that infects a system and steals data",
            "A type of attack that exploits vulnerabilities in software",
            "A type of attack that floods a network with traffic",
          ],
          answer:
            "A type of social engineering attack where an attacker impersonates a legitimate entity to trick users into providing sensitive information",
        },
        {
          question: "What is malware?",
          options: [
            "Software designed to damage or disrupt a computer system or steal information",
            "A type of network security device",
            "A method for securing wireless networks",
            "A type of user account",
          ],
          answer:
            "Software designed to damage or disrupt a computer system or steal information",
        },
        {
          question: "What is a DDoS attack?",
          options: [
            "Distributed Denial of Service attack, where multiple compromised systems are used to flood a target system with traffic, making it unavailable",
            "A type of phishing attack",
            "A type of malware",
            "A type of security audit",
          ],
          answer:
            "Distributed Denial of Service attack, where multiple compromised systems are used to flood a target system with traffic, making it unavailable",
        },
      ],
    },
    "security-2": {
      title: "Firewall Rules",
      questions: [
        {
          question:
            "What is the default action for most firewalls if no rules match?",
          options: ["Allow", "Deny", "Log", "Redirect"],
          answer: "Deny",
        },
        {
          question: "What is a stateful firewall?",
          options: [
            "A firewall that keeps track of the state of network connections and makes decisions based on context",
            "A firewall that only examines individual packets in isolation",
            "A firewall that uses a static set of rules",
            "A firewall that is located in the cloud",
          ],
          answer:
            "A firewall that keeps track of the state of network connections and makes decisions based on context",
        },
        {
          question: "What is an implicit deny rule?",
          options: [
            "A rule that is explicitly configured to deny traffic",
            "A rule that is automatically applied at the end of a firewall ruleset to deny any traffic that hasn't been explicitly allowed",
            "A rule that allows all traffic by default",
            "A rule that logs all traffic",
          ],
          answer:
            "A rule that is automatically applied at the end of a firewall ruleset to deny any traffic that hasn't been explicitly allowed",
        },
        {
          question:
            "Which of the following is a common firewall rule component?",
          options: [
            "Source IP address",
            "Destination IP address",
            "Port number",
            "All of the above",
          ],
          answer: "All of the above",
        },
        {
          question: "What is an ACL?",
          options: [
            "Access Control List",
            "Advanced Configuration Language",
            "Application Control Layer",
            "Automated Connection Log",
          ],
          answer: "Access Control List",
        },
        {
          question: "What is the purpose of a DMZ?",
          options: [
            "To host servers that need to be accessible from the internet, while providing a buffer between the public internet and the internal network",
            "To store sensitive data",
            "To connect to a VPN",
            "To host internal web servers",
          ],
          answer:
            "To host servers that need to be accessible from the internet, while providing a buffer between the public internet and the internal network",
        },
        {
          question: "What is NAT?",
          options: [
            "Network Address Translation",
            "Network Access Tool",
            "New Advanced Technology",
            "Network Authentication Type",
          ],
          answer: "Network Address Translation",
        },
        {
          question: "What is port forwarding?",
          options: [
            "Redirecting traffic from one port to another",
            "Blocking all traffic on a specific port",
            "Allowing all traffic on a specific port",
            "Encrypting traffic on a specific port",
          ],
          answer: "Redirecting traffic from one port to another",
        },
        {
          question:
            "Which protocol is commonly used for secure remote access to a firewall?",
          options: ["SSH", "Telnet", "FTP", "HTTP"],
          answer: "SSH",
        },
        {
          question: "What is the benefit of using a firewall?",
          options: [
            "Improved network security",
            "Increased network speed",
            "Simplified network management",
            "Reduced network costs",
          ],
          answer: "Improved network security",
        },
      ],
    },
  };

  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  let selectedAnswers = [];

  const quizContainer = document.getElementById("quiz");
  const progressBar = document.getElementById("progressBar");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const submitButton = document.getElementById("submit");
  const retryButton = document.getElementById("retry");
  const showAnswerButton = document.getElementById("showAnswer");
  const resultContainer = document.getElementById("result");
  const quizTitleElement = document.getElementById("quizTitle");

  // Load the quiz data based on the quizId.
  let currentQuiz;
  if (quizId && quizData[quizId]) {
    currentQuiz = quizData[quizId];
    quizTitleElement.textContent = currentQuiz.title; // Set the quiz title
    displayQuestion(); // Start displaying questions
  } else {
    resultContainer.innerHTML = "<p>Error: Quiz not found.</p>";
  }

  function updateProgress() {
    const progress =
      ((currentQuestion + 1) / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${currentQuestion + 1}/${
      currentQuiz.questions.length
    }`;
  }

  function displayQuestion() {
    const questionData = currentQuiz.questions[currentQuestion];
    updateProgress();

    const optionsHtml = questionData.options
      .map(
        (option, index) =>
          `<div class="form-check option">
                <input class="form-check-input" type="radio" name="quiz" id="option${index}" value="${option}" ${
            selectedAnswers[currentQuestion] === option ? "checked" : ""
          }>
                <label class="form-check-label" for="option${index}">${option}</label>
            </div>`
      )
      .join("");

    quizContainer.innerHTML = `
            <h5 class="question mb-3">${questionData.question}</h5>
            <div class="options">${optionsHtml}</div>
        `;

    prevButton.disabled = currentQuestion === 0;
    nextButton.classList.toggle(
      "d-none",
      currentQuestion === currentQuiz.questions.length - 1
    );
    submitButton.classList.toggle(
      "d-none",
      currentQuestion !== currentQuiz.questions.length - 1
    );

    // Add event listener to radio buttons to store answer on change.
    document.querySelectorAll('input[name="quiz"]').forEach((radio) => {
      radio.addEventListener("change", checkAnswer);
    });
  }

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      selectedAnswers[currentQuestion] = answer; // Store selected answer
      const questionData = currentQuiz.questions[currentQuestion];
      if (answer !== questionData.answer) {
        // Check if answer is correct
        // Find the incorrect answer if it exists, otherwise add it
        const existingIncorrectAnswer = incorrectAnswers.find(
          (ia) => ia.question === questionData.question
        );
        if (existingIncorrectAnswer) {
          existingIncorrectAnswer.incorrectAnswer = answer; // Update if it exists
        } else {
          incorrectAnswers.push({
            // Add new incorrect answer
            question: questionData.question,
            incorrectAnswer: answer,
            correctAnswer: questionData.answer,
          });
        }
      } else {
        score++; //correct answer
        // Remove from incorrectAnswers if it's there
        incorrectAnswers = incorrectAnswers.filter(
          (ia) => ia.question !== questionData.question
        );
      }
    }
  }

  function showResults() {
    quizContainer.innerHTML = "";

    // Display congratulatory message if all answers are correct
    if (score === currentQuiz.questions.length) {
      resultContainer.innerHTML = `<div class="congratulations animate-congratulations">Congratulations! You got all the answers correct!</div>`;
    } else {
      resultContainer.innerHTML = `<p>You scored <strong>${score}</strong> out of <strong>${currentQuiz.questions.length}</strong>.</p>`;
    }
    retryButton.classList.remove("d-none");
    showAnswerButton.classList.remove("d-none");
    nextButton.classList.add("d-none");
    prevButton.classList.add("d-none");
    submitButton.classList.add("d-none");
  }

  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    selectedAnswers = [];
    resultContainer.innerHTML = ""; // Clear previous results
    retryButton.classList.add("d-none");
    showAnswerButton.classList.add("d-none");
    nextButton.classList.remove("d-none");
    prevButton.classList.remove("d-none");
    displayQuestion();
  }

  function showAnswers() {
    const answersHtml = incorrectAnswers
      .map(
        (answer) =>
          `<div class="mb-3">
            <p><strong>Question:</strong> ${answer.question}</p>
            <p><span class="incorrect">Your Answer:</span> ${answer.incorrectAnswer}</p>
            <p><span class="correct">Correct Answer:</span> ${answer.correctAnswer}</p>
        </div>`
      )
      .join("");

    // Only show the "Answers" section if there are incorrect answers
    if (incorrectAnswers.length > 0) {
      resultContainer.innerHTML = `<h4 class="mb-3">Answers</h4>${answersHtml}`;
    } else {
      // Optionally, clear or show a message if there are no incorrect answers
      resultContainer.innerHTML = ""; // Or a message like "All answers were correct!"
    }
  }
  prevButton.addEventListener("click", () => {
    currentQuestion--;
    displayQuestion();
  });

  nextButton.addEventListener("click", () => {
    currentQuestion++;
    displayQuestion();
  });

  submitButton.addEventListener("click", () => {
    showResults();
  });

  retryButton.addEventListener("click", retryQuiz);
  showAnswerButton.addEventListener("click", showAnswers);
});
