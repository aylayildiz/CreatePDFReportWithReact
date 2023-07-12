import PropTypes from 'prop-types';

import { Text, StyleSheet, View, Page, Document, Image, Font, PDFDownloadLink } from "@react-pdf/renderer";
import pdf from '../src/assets/images/icons/pdf1.png';

/*================================================|| COMPONENT İLE İLGİLİ AÇIKLAMA  ||=========================================== */
//                                                                                                                                //
//  İlgili component gönderilen veriler doğrultusunda pdf formatında rapor oluşturmak amaçlı kullanılır.                          //
//  Özellik olarak gönderilen;                                                                                                    //
//      data parametresi:  Rapora yansıyacak data yer almalı                                                                      //
//      columns parametresi: Raporda yer alacak kolon bilgileri yer alır genişlik, header ve accessor bilgileri yer almalı        //
//      raporHeader parametresi: Raporda başlık olorak yer alması istenen string yer almalı                                       //
//      raporYonu parametresi: Raporun yönü belirlenmeli. orientation="portrait" ( DİKEY) -- orientation="landscape" ( YATAY)     //
/*=============================================================================================================================== */

const tarih = new Date();
const gun= tarih.getDate();
const ay= tarih.getMonth()+1;
const yil= tarih.getFullYear();

console.log( tarih, gun,ay,yil);

//getDay(Date(now))+'.'+getMounth(Date(now))+'.'+getYear(Date(now));

Font.register({    // TURKÇE KARAKTER SORUNU ÇÖZÜMÜ
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

const tableStyles = StyleSheet.create({
    table: {
        width: '100%',
        textAlign: "center",
        fontsize: 8,
        paddingTop: 30,
        paddingBottom: 30,
        marginBottom: 10,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        paddingTop: 1,
        paddingBottom: 1,
        marginBottom: 1,
        color: "#303030",

    },
    header: {
        fontsize: 20,
        marginTop: 15,
        marginBottom: 5,
        textAlign: "left",
        color: "black",

    },
    bold: {
        fontWeight: 'bold',
    },
    // So Declarative and unDRY 👌
    column: {
        width: 30,
        fontsize: 8,
    },
    column1: {
        width: '5%',
        fontsize: 8,
    },
    column2: {
        width: '7%',
        fontsize: 8,
    },
    column3: {
        width: '15%',
        fontsize: 8,
    },
    column4: {
        width: '10%',

        fontsize: 8,
    },
    column5: {
        width: '66%',
        textAlign: "left",
        fontsize: 8,
    },
});

const pageStyles = StyleSheet.create({
    body: {
        paddingTop: 25,
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 40,
        fontFamily: 'Roboto'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 1,
        paddingBottom: 1,
        marginBottom: 1,
        color: "#303030",
    },
    column1: {
        width: '14%',

    },
    column2: {
        width: '72%',
        fontsize: 24,
        paddingVertical: 20,
        textAlign: "center"
    },
    column3: {
        width: '8%',
        fontsize: 8,
        //paddingVertical: 20,
        textAlign: "left"
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 8,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },

});


const PDFReport = ({ data, raporHeader, columns, raporYonu }) => {

    const sutun = 100 / columns.length;
    var sutunGenisligi = sutun + '%';
    console.log("sutunGenisligi:", sutunGenisligi);
    console.log("data:", data);
    console.log("data typeOf", typeof (data));
    console.log("columns:", columns);
    console.log("columns typeOf", typeof (columns));

/******************************************************************************* */


    return (
        <PDFDownloadLink  
            document= {
                    <Document>
                        <Page style={[pageStyles.body]} orientation={raporYonu}>
                            <View style={pageStyles.row}>                                
                                <Text style={pageStyles.column2}>{raporHeader}</Text>
                            </View>
                            <View>
                                <Text style={[{fontSize: 8 }, {textAlign:'right'} ]}>Raporun Oluşturulma Tarihi :{' '+gun+'.'+ay+'.'+yil}</Text>
                            </View>

                            <View style={[tableStyles.row, { borderTop: '' }, tableStyles.header, { fontSize: 10 }]}>
                                <Text style={[{ width: 30 }, { fontSize: 10 }]}>S.N.</Text>                    
                                {
                                    columns.map((item) => (
                                        <Text style={[{ width: item["width"] }]}>{item["Header"]}</Text>
                                    ))
                                }
                            </View>
                            <View >
                                {
                                    data.map((item, i) => (                                                       
                                        <View key={i} style={[tableStyles.row]} wrap={true}>
                                            <Text style={[{ width: 30 }, { fontSize: 8 }]}>{i + 1}</Text>
                                            {
                                                columns.map((itemColumn) => (
                                                    <Text style={[{ width: itemColumn["width"] }, { fontSize: 8 }]}>{item[itemColumn["accessor"]]}</Text>
                                                ))
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                            <Text style={pageStyles.pageNumber} render={({ pageNumber, totalPages }) => (
                                `${pageNumber} / ${totalPages}`
                            )} fixed />

                        </Page>
                    </Document>
            }    
        >
            {({loading})=>(loading ? <button color="secondary" ></button> :  <input type="image" value="submit" width="50px" src={pdf} alt= "PDF Olarak Kaydet"/>)}
        </PDFDownloadLink>
    );
}

PDFReport.propTypes = {
    data: PropTypes.array.isRequired, 
    columns: PropTypes.array, 
    raporHeader: PropTypes.string, 
    raporYonu: PropTypes.string 
};

export default PDFReport;