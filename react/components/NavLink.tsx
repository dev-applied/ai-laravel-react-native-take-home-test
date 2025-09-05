import {Link, usePathname, type LinkProps} from "expo-router";
import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";


type Props = LinkProps & {

};

export default function NavLink({href, style, ...props}: Props ) {
    const path = usePathname();
    const [internalStyles, setInternalStyles] = useState([styles.navItem, style]);

    useEffect(() => {
        setInternalStyles([styles.navItem, href === path ? styles.active : {}, style])
    }, [path, href, style])

    return (
        <Link href={href} style={internalStyles} {...props} />
    );
}
const styles = StyleSheet.create({
    active: {color: "#F87171"},
    navItem: {color: "#fff", fontWeight: "700"},
})
