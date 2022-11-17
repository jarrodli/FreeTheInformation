import React from "react";
import { headerTextCss } from "../nsw/apply";

export default function About() {
    return (
        <div className="p-20 max-w-5xl bg-white h-full">
            <div>
                <div>
                    <h1 className={`${headerTextCss} text-center font-inter`}>
                        Welcome to FreeTheInformation
                    </h1>
                </div>
                <div className="py-10 space-y-6">
                    <p className={"font-inter text-black"}>
                        Under Part III of the <i>Freedom of Information Act</i>{" "}
                        (Cth), members of the public can obtain access to a
                        government agency or ministerial documents. Access to
                        government information is key in ensuring ‘openness,
                        accountability and responsibility’ within a democratic
                        government. Importantly, transparency is necessary in
                        order to ensure that the actions of the government are
                        exposed to public security and challenge. This is
                        necessary to ensure public confidence in government. In
                        order to ensure transparency is maintained, government
                        services and information must be readily available.
                    </p>
                    <p className={"font-inter text-black"}>
                        Accordingly, FOI requests aim to ‘increas[e] public
                        participation in Government processes, with a view to
                        promoting better-informed decision-making; and
                        increas[e] scrutiny, discussion, comment and review of
                        the Government’s activities’ (Senate Standing Committee
                        on Constitutional and Legal Affairs).
                    </p>
                    <p className={"font-inter text-black"}>
                        However, ‘Australia’s FOI regime continues to be
                        undermined in practice by inordinate delay,
                        under-resourcing and the abuse of statutory exceptions’
                        (Centre for Public Integrity).
                    </p>
                    <p className={"font-inter text-black"}>
                        FreeTheInformation attempts to tackle 2 of these
                        problems.
                    </p>
                    <p className={"font-inter text-black"}>
                        <b>
                            <i>
                                Problem 1: There is no common approach to
                                submitting an FOI request, either across states
                                or at the Commonwealth level. See, eg, by email
                                (AG and Federal Court, by web form (Home
                                Affairs).
                            </i>
                        </b>
                    </p>
                    <p className={"font-inter text-black"}>
                        All Australian states have legislation that allows the
                        public to access equivalent documents within the given
                        state's agencies. For example, the{" "}
                        <i>Government Information (Public Access) Act</i> 2009
                        (NSW) (‘GIPA Act’) provides access to government
                        information in NSW. The difference in legislation
                        between states means that there is no standardised
                        method of applying for an FOI request&mdash;generally,
                        you would have to follow the specific application
                        process of whichever agency whose documents you want
                        access to. This can be incredibly confusing and time-
                        consuming, particularly as a number of these agencies
                        provide little information on what is needed to actually
                        submit an FOI request.
                    </p>
                    <p className={"font-inter text-black"}>
                        RightToKnow attempts to do something similar, within the
                        Commonwealth jurisdiction, but publishes all requests
                        online. This is problematic as many users, particularly
                        journalists, fall under an ethical obligation to keep
                        their requests private.
                    </p>
                    <p className={"font-inter text-black"}>
                        FreeTheInformation attempts to standardise the
                        application process within each state and the
                        Commonwealth jurisdiction by reducing the application
                        process into a simple form that can be submitted to any
                        agency. This way, the application process remains
                        entirely private.{" "}
                        <b>
                            No information you provide leaves your device. We do
                            not store any user information, nor do we publish
                            application requests online.
                        </b>
                    </p>
                    <p className={"font-inter text-black"}>
                        <b>
                            <i>
                                Problem 2: Government agencies are increasingly
                                refusing FOI requests on ‘practical’ grounds.
                            </i>
                        </b>
                    </p>
                    <p className={"font-inter text-black"}>
                        It has become more common for government agencies to
                        come across FOI requests that do not comply with
                        requisite standards. In these cases, FOI requests are
                        generally refused on ‘practical grounds’ under s 24AB of
                        the <i>FOI Act</i>&mdash;‘if the work involved in
                        processing the FOI request would substantially and
                        unreasonably divert the agency’s resources from its
                        other operations or if it does not adequately identify
                        the documents sought.’ In 2021-22, 1281 requests were
                        rejected for this very reason. This is also problematic
                        as it adds to the workload of agency staff, increasing
                        the amount of time it takes for FOI requests to be
                        processed. FreeTheInformation targets this problem by
                        guiding users through the process of creating a valid,
                        informative FOI request.
                    </p>
                    <p className={"font-inter text-black"}>
                        <i>
                            FreeTheInformation does not claim to provide legal
                            advice, are not intended to be a substitute for
                            legal advice.
                        </i>
                    </p>
                </div>
            </div>
        </div>
    );
}
