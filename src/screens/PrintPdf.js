import * as React from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { WebView } from 'react-native-webview';

import { COLORS, FONTS } from '../constants';
import { CustomButton } from '../components';

const sampleING = `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0" />
    <style>
      .border, .border.focus {
        transition: border-color .25s ease;
      }
      .border {
        border: 1px solid #dee2e6!important;
      }
      .table {
        color: var(--black);
        border-collapse: collapse;
      }
      .mb-0, .my-0 {
        margin-bottom: 0!important;
      }
      .table {
        width: 100%;
      }
      table {
        border-collapse: collapse;
      }
      table[id^="pills-"] td {
        vertical-align: middle;
      }
      hr, .table td, .table th, .list-group-item {
          border-color: rgba(0,0,0,.075);
      }
      .table-borderless tbody+tbody, .table-borderless td, .table-borderless th, .table-borderless thead th {
          border: 0;
      }
      .border-top {
        border-top: 1px solid #dee2e6;
      }
      .table td, .table th {
          padding: 0.75rem;
      }
      .pt-0, .py-0 {
          padding-top: 0;
      }
      *, ::after, ::before {
          box-sizing: border-box;
      }
      .h5, h5 {
        font-size: 1.25rem;
      }
      .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
          margin-bottom: 0.5rem;
          font-weight: 500;
          line-height: 1.2;
      }
      h1, h2, h3, h4, h5, h6 {
          margin-top: 0;
      }
    </style>
  </head>
  <body>
    <div class="border">
      <table class="table table-borderless mb-0" id="pills-1-table">
        <tbody>
            <tr>
              <td align="center" colspan="3">
                <h5><b>INFORMASI NILAI GIZI</b></h5>
              </td>
            </tr>
            <tr>
              <td class="pt-0" colspan="3">
                Takaran saji 20 gram <br>
                5 Sajian per kemasan
              </td>
            </tr>
            <tr class="border-top">
              <td colspan="3"><b>JUMLAH PER SAJIAN</b></td>
            </tr>
            <tr>
              <td class="pt-0" colspan="2"><b>Energi Total</b></td>
              <td class="pt-0" align="right" style="min-width: 70px;"><b>110 kkal</b></td>
            </tr>
            <tr class="border-top">
              <td colspan="2"></td>
              <td align="right"><b class="ws-nowrap">% AKG *</b></td>
            </tr>
            <tr>
              <td class="pt-0"><b>Lemak Total</b></td>
              <td class="pt-0" align="right"><b>6 g</b></td>
              <td class="pt-0" align="right"><b>9 %</b></td>
            </tr>
            <tr>
              <td class="pt-0"><b>Lemak Jenuh</b></td>
              <td class="pt-0" align="right"><b>4.5 g</b></td>
              <td class="pt-0" align="right"><b>24 %</b></td>
            </tr>
            <tr>
              <td class="pt-0"><b>Protein</b></td>
              <td class="pt-0" align="right"><b>0 g</b></td>
              <td class="pt-0" align="right"><b>1 %</b></td>
            </tr>
            <tr>
              <td class="pt-0"><b>Karbohidrat Total</b></td>
              <td class="pt-0" align="right"><b>12 g</b></td>
              <td class="pt-0" align="right"><b>4 %</b></td>
            </tr>
            <tr>
              <td class="pt-0"><b>Gula</b></td>
              <td class="pt-0" align="right"><b>0 g</b></td>
              <td class="pt-0" align="right"></td>
            </tr>
            <tr>
              <td class="pt-0"><b>Garam (natrium)</b></td>
              <td class="pt-0" align="right"><b>115 mg</b></td>
              <td class="pt-0" align="right"><b>8 %</b></td>
            </tr>
            <tr class="border-top">
              <td colspan="3">
                <em>* Persen AKG berdasarkan kebutuhan energi 2150 kkal. Kebutuhan energi Anda mungkin lebih tinggi atau lebih rendah.</em>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;

export default function PrintPdf() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html: sampleING,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      sampleING,
    });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const array = [
    {
      company: 'Alfreds Futterkiste',
      contact: 'Maria Anders',
      country: 'Germany',
    },
    {
      company: 'Centro comercial Moctezuma',
      contact: 'Francisco Chang',
      country: 'Mexico',
    },
    { company: 'Ernst Handel', contact: 'Roland Mendel', country: 'Austria' },
    { company: 'Island Trading', contact: 'Helen Bennett', country: 'UK' },
    {
      company: 'Laughing Bacchus Winecellars',
      contact: 'Yoshi Tannamuri',
      country: 'Canada',
    },
    {
      company: 'Magazzini Alimentari Riuniti',
      contact: 'Giovanni Rovelli',
      country: 'Italy',
    },
  ];

  const createDynamicTable = () => {
    var table = '';
    for (let i in array) {
      const item = array[i];
      table =
        table +
        `
      <tr>
        <td>${item.company}</td>
        <td>${item.contact}</td>
        <td>${item.country}</td>
      </tr>
      `;
    }

    // console.log(table);
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
      </style>
      </head>
      <body>
      
      <h2>HTML Table</h2>
      
      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        ${table}
      </table>
      
      </body>
    </html>
      `;
    return html;
  };

  const htmlContent = {
    html: sampleING,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}>
      <WebView
        style={{
          marginTop: 20,
        }}
        userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
        originWhitelist={['*']}
        source={htmlContent}
      />
      <View
        style={{
          paddingVertical: 20,
        }}>
        <CustomButton
          buttonText="Save/Print"
          buttonContainerStyle={{
            paddingVertical: 18,
            borderRadius: 20,
          }}
          colors={[COLORS.darkGreen, COLORS.lime]}
          onPress={print}
        />
        {/* <View style={styles.spacer} />
          <Button title="Print to PDF file" onPress={printToFile} /> */}
        {Platform.OS === 'ios' && (
          <>
            <View style={styles.spacer} />
            <Button title="Select printer" onPress={selectPrinter} />
            <View style={styles.spacer} />
            {selectedPrinter ? (
              <Text
                style={
                  styles.printer
                }>{`Selected printer: ${selectedPrinter.name}`}</Text>
            ) : undefined}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spacer: {
    margin: 5,
  },
});
