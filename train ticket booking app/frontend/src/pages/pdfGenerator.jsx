import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import logoSrc from '../assets/retro-train.jpg';

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        padding: 40,
    },
    logoContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    text: {
        display: "inline",
        marginBottom: 8,
    },
});

const PdfFile = ({ data }) => {

    return (
        <Document>
            <Page style={styles.page} wrap>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src={logoSrc} />
                </View>
                {Object.keys(data).map((field, index) => (
                    <View key={index}>
                        <Text style={styles.text}>
                            {field}: {data[field]}
                        </Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default PdfFile;