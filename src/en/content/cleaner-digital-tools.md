# Cleaner digital tools: {.app-content-centered}
## Building better public services {.app-content-centered}

**In the mid-nineteenth century**, the surgeon Joseph Lister made a disturbing observation. Patients with broken bones were often more likely to die from surgery than from the injury itself.

It was not the fracture that killed them. It was the infection introduced during the operation. In an effort to heal, the medical profession was unwittingly introducing harm. Lister's insight laid the groundwork for antiseptic practice, and transformed surgery from an act of hope into one of precision and safety.

Today, public service organisations are in a similar position. In their attempts to modernise, digitise, and extend their reach, they are turning increasingly to easy to implement, cheap or free, tools market supported digital tools. These widely used tools promise efficiency, compatibility, insight, personalisation, and cost minimisation. But like the unwashed instruments of pre-antiseptic surgery, they often introduce unseen risks.

Many of these tools are built not to prioritise public service, but for observation and data extraction. They come embedded with surveillance defaults, opaque data practices, and incentive structures optimised for profit rather than trust. They do not merely process information. They amass it. They do not simply enable functionality. They monetise it. And when introduced into public systems without scrutiny or adaptation, they can compromise not only the rights of users but the integrity of the institution itself. Any organisation that allows its own users to be turned into data fodder, in order to avoid the costs of providing the service it was established to give, runs the very real risk of losing the trust and goodwill of the public.

A public library that adopts a commercial reading platform may unwittingly expose patron behaviour to third-party analytics. A public broadcaster that uses 3rd party algorithmic recommendation engines may reinforce polarisation or feed back user preferences into opaque commercial ecosystems. A public health service that outsources scheduling or medical records to private apps may lose control over its patients' most intimate data. In each case, the tool solves a surface problem, but introduces a deeper systemic risk. Surveillance becomes ambient. Consent becomes assumed. The public sphere first becomes porous then toxic.

This is not a Luddite position. It is a design principle. Digital tools are not neutral. They carry assumptions, incentives, and architectures of power. To deploy them without scrutiny is not innovation. It is neglect. And for institutions founded on trust, that failing alone can be fatal.

Public institutions are not merely service providers. They are stewards of civic legitimacy. Their digital choices must reflect that responsibility. That means developing clear standards for digital procurement, embedding public values into system design, and refusing tools that compromise integrity in exchange for convenience.

There are many good examples to use as models for the future. Some public institutions have treated digital tools the way Lister treated surgical instruments: they recognised that the environment itself was hazardous, and they acted deliberately to cleanse and protect it. They invested in safer code, stripped out unnecessary trackers, and insisted on civic-grade practices even if it slowed them down or cost them more. These services might not have been the slickest at launch, but over time they built trust because people knew they were designed to protect, not to exploit.

However, many others have chosen to operate with only partly cleaned tools inside an unclean environment. A new service might be launched with great fanfare – a streaming platform, a digital archive, an interactive portal – but beneath the surface, the adoption of standard analytics frameworks and off-the-shelf recommendation engines quietly reintroduced the very infections they claimed to have eradicated. Management reports are produced, charts are circulated, decisions are justified, yet very little of this data actually shifts the direction of the service development. The institution continues to build what it was already going to build, while embedding the very vulnerabilities they should have removed.

Just as antiseptic technique required the medical profession to consciously reimagine its relationship to cleanliness, digital antisepsis demands that public institutions pay attention to their relationship to code, data, and infrastructure. The goal is not perfection. It is protection. Not technological retreat, but strategic defiance in the public's best interest.

### Civic-grade digital hygiene

Dot-Public will suggest a set of tools for developers to use when creating sites and services. These are meant to be as routine as running a spell-checker so that the devs can still use the free 3rd party tools - particularly when the guarantee of support is going to be essential. They can be run quickly before publishing a page, or scheduled to run every week or two, or even built into a site's workflow so they automatically flag problems as they arise - e.g. when a tool is updated and the previously removed defaults are restored. They don't require specialist knowledge, just a willingness to see digital hygiene as part of providing normal public services. The following is a sketch of what such cleansing tools might look like in practice:

#### Cookies and trackers
**Cookie checker**: This one would look at every cookie the website drops on a visitor's device. It flags the ones that are unnecessary, or that hang around too long, or belong to third parties. The idea is to keep only what's essential, so data isn't collected for no reason.

**Tracker finder**: Scans the site for hidden advertising trackers or bits of code that quietly send information about visitors to outside companies. It specialises in making visible what is intentionally invisible.

**Old code sweeper:** Finds any leftover tracking or test code that continues running in the background long after its original purpose has ended. This prevents unnecessary inadvertent data collection simply because no one remembered to turn it off.

#### Accessibility and user experience
**Access check**: Runs through all the site's pages and highlights things that make life harder for people with disabilities, such as missing captions, low-contrast text, or buttons without labels. It shows where the gaps are so the site works better for everyone.

**Dark Pattern detector**: Spots so called 'Dark Patterns' such as design tricks that nudge people into agreeing to things they may not want, like pre-ticked consent boxes. It highlights these when it finds them and then suggests more transparent alternatives.

**Robustness:** Determines that core functionality and content is available without JavaScript.

#### Website address, email, and safety
**Name guard**: Checks the health of the website's address records (the behind-the-scenes directions that tell the internet where to find it). [According to Jens Finkhaüser, weaknesses here can make a site easier to hijack or impersonate.]

**Mail shield**: Something that looks at the organisation's email setup linked to the website to see if scammers could easily fake the address, or if messages are likely to end up in spam instead of reaching people or if it is adding code that is not required or worse. [Stephen Farrell would be better at explaining this one]

**Secure connection check**: Reviews whether the website uses up-to-date, safe connections so that visitors aren't exposed to weak encryption or faulty links.

**Integrity shield**: Checks that the site is properly protected against rogue code being slipped in from elsewhere.

#### Data and privacy
**Form checker**: Scans the forms on a site to see if they ask people for personal details that aren't really needed. It also warns if sensitive data is being collected without enough protection or safe storage.

**Retention sweeper**: Looks for old logs, stored data, or external services still holding information long after it stopped being useful. It encourages clearing away data that no longer serves a purpose.

**Consent matcher**: Checks when what a consent notice promises matches what the site actually does. For example, if a banner says _no tracking_ but the page still loads trackers, this tool points out the mismatch.

#### Other ideas
**Third-party inventory**: Lists all the outside software the site quietly uses, such as code libraries or plugins. It shows which ones may be risky or unnecessary, helping identify what could be removed or hosted more safely.

**Performance and carbon check**: Measures how much extra weight hidden trackers and add-ons put on the site, including their effect on speed and carbon footprint. Maybe it shows the gains that come from trimming excess.
