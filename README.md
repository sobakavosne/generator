**Generator**

Application aimed to generate a large number of records (MySQL).

**To-do list:**

- [x] Create Generator
- [x] Create Buffer
- [x] Create Scheduler
- [ ] Create Client (full run usage)
- [ ] Mark the phonesIO object on the heap to use it in the contact generation to avoid buffering

**MySQL-generator usage**

Create `.env` file in `/mysql-generator` folder with the following content:

```bash
cat > .env

PORT=...                  # Server port (if needed)

HOST=...                  # DB host
USER=...                  # DB username
PSSWD=...                 # DB password
DATABASE=...              # DB name

N=...                     # Desired number of phones
GENNUMBER=...             # Number of generations to send
PHONELENGTH=...           # Phone length
PSSWDLENGTH=...           # Password length
HASHTAGLENGTH=...         # Hashtag length
MINCONTACTSNUMBER=...     # Minimum of contacts per phone
MAXCONTACTSNUMBER=...     # Maximum of contacts per phone

TMPPATH=tmp
TMPFILE=buffer.txt

MARK=...                  # Mark of generated contacts
                          # Mark increases on GENERATIONAMOUNT value
```

**Phones** are generated in the following order:

`f(`identity`) -> Generation number (`GENERATION`) + Filling with zeros + Phone increment (`*F(identity)* ∌ GENERATION .. N`)`

 yumi_user_id | hashtag | password 
 --- | --- | ---  
 1000000000002 | 'fhdsuai' | 'fjsdig'
 ... | ... | ...

**Contacts** are generated in the following order:

`f(`phone`) -> Last meaningful phone value (`*F(identity)* ∌ GENERATION .. N`) + Filling with zeros + Contact increment (`*F(identity)*`)`

 id | yumi_user_id | contact_user_id 
 --- | --- | --- 
 1 | 1000000000002 | 2000000000001
... | ... | ...

**Minimum requirements** for generation process:
 - CPU - 2 physical cores
 - RAM - 12Gb

**Restrictions**: generation number (**GENNUMBER**) concatenated with maximum phone increment (**~N**) cannot be more than phone length (**PHONELENGTH**).

First monad (**phonesIO**): demonstration.

![](static/demonstration/node-10M-generator.gif)

Second monad (**contactsIO**): The generation of a large number of records occurs through the sequential start of the child processes of generateWithChildIOR scheduler monad (`R` means ***recursively***).

**Machine**:

```bash
OS: Ubuntu 16.04.6 LTS x86_64
Kernel: 4.4.0-1106-aws
CPU: AMD EPYC 7571 (4) @ 2.199GHz 
RAM: 31797MiB
```

**Users** benchmarks:

```bash
1M records are generated for 1.9s.
1M records are sent to MySQL for 1.5.
1M records are inserted into DB for 8s.

10M records are generated and sent by Node.js in: 35649.538ms.
10M generation, sending and insertion occurs for 99906.295ms.
```

**Contacts** benchmarks (slow buffering):

```bash
1M contacts are generated and sent for 47s.
1M records are inserted into DB for 10s.
```