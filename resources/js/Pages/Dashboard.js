import React, {
    useRef,
    useCallback,
    useEffect,
    useState,
    useMemo,
} from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Map from "@/Components/Map";
import BarChart from "@/Components/BarChart";
import DonutChart from "@/Components/DonutChart";
import { borderWidth } from "tailwindcss/defaultTheme";
import { forEach } from "lodash";
import * as d3 from "d3";

const navigation = [
    // { name: '服務項目', href: 'service' },
    { name: "聯繫我們", href: "/contact" },
];

const data = Array.from({ length: 30 }, (_, i) => ({
    name: (i - 29) * -1,
    orders: getRandom(101),
}));

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

export default function Dashboard(props) {
    const [loaded, setLoaded] = useState(false);
    const dountRef = useRef(null);

    // todo: to fix, need cleanup function. refactor to sub/pub pattern
    const onLoaded = useCallback(() => {
        setLoaded(true);
    }, []);
    const userCount = useMemo(() => {
        return data.reduce((preValue, currentValue) => {
            return { orders: preValue.orders + currentValue.orders };
        }).orders;
    }, [data]);

    const devices = useMemo(() => {
        const mobile = Math.floor(Math.random() * userCount);
        const desktop = Math.floor(Math.random() * (userCount - mobile));
        const table = userCount - mobile - desktop;

        const mobilePercent = Math.round((mobile / userCount) * 1000) / 10;
        const desktopPercent = Math.round((desktop / userCount) * 1000) / 10;
        const tablePercent =
            Math.round((100 - mobilePercent - desktopPercent) * 10) / 10;

        return [
            {
                name: "mobile",
                count: mobile,
                percent: mobilePercent,
            },
            {
                name: "desktop",
                count: desktop,
                percent: desktopPercent,
            },
            {
                name: "table",
                count: table,
                percent: tablePercent,
            },
        ].sort(function (a, b) {
            return a.count - b.count;
        });
    }, [userCount]);

    useEffect(() => {
        if (loaded) {
            Array.from(document.querySelectorAll(".countup")).forEach(
                (element) => {
                    counterUp(element, {
                        duration: 640,
                        delay: 32,
                    });
                }
            );
        }
        return () => {};
    }, [loaded]);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <div className="mx-auto h-full bg-[#cacdcf]">
                <div className="relative bg-[#cacdcf]">
                    <div className="absolute top-0 left-0 pt-[128px] px-8 z-10">
                        <div className="px-6 pt-6 h-[402px] w-[306px] bg-white/90  rounded-lg border border-gray-300 backdrop-opacity-10">
                            <div className="py-2">
                                <dt className="text-xs font-medium text-gray-500 truncate">
                                    過去 30 分鐘的使用者
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900 countup">
                                    {loaded
                                        ? new Intl.NumberFormat().format(
                                              userCount
                                          )
                                        : "0"}
                                </dd>
                            </div>
                            <div className="py-2">
                                <dt className="text-xs font-medium text-gray-500 truncate">
                                    每分鐘的使用者
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    <BarChart data={data} />
                                </dd>
                            </div>
                            <div className="py-2">
                                <dt className="text-xs font-medium text-gray-500 truncate">
                                    過去 30 分鐘的使用者
                                </dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                    <DonutChart
                                        data={devices}
                                        dountRef={dountRef}
                                    />
                                </dd>
                            </div>
                        </div>
                    </div>
                    <Map
                        className="w-full min-h-[550px] h-1/2"
                        handelLoaded={onLoaded}
                    />
                </div>
            </div>
        </Authenticated>
    );
}
